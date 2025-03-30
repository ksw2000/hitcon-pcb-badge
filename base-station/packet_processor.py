import logging
import asyncio
import uuid


class PacketProcessor:
    def __init__(self, backend, ir):
        self.backend = backend
        self.ir = ir

        self.logger = logging.getLogger(__name__)

        # These variables should be persisted to disk on update to ensure durability during restart/program crash.
        self._transmitted_packet_ids = set()
        self._transmit_packet_queue = asyncio.Queue(maxsize=0)
        # Packet received but not yet forwarded to backend.
        self._received_packet_queue = []

    def start(self):
        # TODO: run all the tasks below and have them in background.
        asyncio.create_task(self._tx_backend_task())
        asyncio.create_task(self._tx_ir_task())
        asyncio.create_task(self._rx_ir_task())
        asyncio.create_task(self._rx_backend_task())

    async def _tx_backend_task(self):
        # Continuously fetch a packet from backend interface, then check if it's a duplicate, if not, then queue it.
        while True:
            packet_data, packet_id = await self.backend.get_next_tx_packet()
            if packet_id in self._transmitted_packet_ids:
                # Duplicate packet.
                self.logger.warning(
                    f"Received duplicate packet {packet_id} from backend server"
                )
                continue
            self._transmitted_packet_ids.add(packet_id)
            # TODO: Persist the queued packet to disk.
            await self._transmit_packet_queue.put((packet_id, packet_data))

    async def _tx_ir_task(self):
        # Continuously check it to ir interface. Also retry any failed previous tx.
        while True:
            packet_data, packet_id = await self._transmit_packet_queue.get()
            ret = await self.ir.trigger_send_packet(packet_data)
            if not ret:
                # Requeue to ensure proper transmission.
                await self._transmit_packet_queue.put((packet_id, packet_data))

    async def _rx_ir_task(self):
        # Receive any packet from ir interface then forward it to backend.
        while True:
            packet_data = await self.ir.get_next_packet()
            if not packet_data:
                self.logger.warning(
                    f"Fail to receive packet {packet_data} from ir interface"
                )
                continue
            packet_id = uuid.uuid4()
            # TODO: Persist to disk.
            await self._received_packet_queue.put((packet_id, packet_data))

    async def _rx_backend_task(self):
        # Send received packet to the backend.
        while True:
            packet_id, packet_data = await self._received_packet_queue.get()
            ret = await self.backend.send_received_packet(packet_data, packet_id)
            if not ret:
                self.logger.warning(
                    f"Failed to forward received packet {packet_id} to upstream backend"
                )
                await self._received_packet_queue.put((packet_id, packet_data))
