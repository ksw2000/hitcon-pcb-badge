#ifndef LOGIC_BASESTN_HUB_DOT_H_
#define LOGIC_BASESTN_HUB_DOT_H_

#include <stddef.h>
#include <stdint.h>

namespace hitcon {
namespace basestn {

// Forwards packet between usb and ir interface.
class BaseStationHub {
 public:
  BaseStationHub();

  // buffer index specification:
  // [0:7] Index into the buffer.
  // [8:12] Reserved. Will be ignored by methods in this class.
  // [13:14] Which buffer? 0 to 3.
  // [15] Set for TX, clear for RX.

  // Write to the buffer at buffer_idx (see buffer index definition) with data
  // for cnt bytes. Return true if successful.
  bool WriteBuffer(uint16_t buffer_idx, uint8_t* data, size_t cnt);

  // Read the buffer at buffer_idx (see buffer index definition). Read cnt
  // bytes, and store result in memory pointed to by data.
  bool ReadBuffer(uint16_t buffer_idx, uint8_t* data, size_t cnt);

 private:
  // 4 rx buffers and 4 tx buffers.
  // Each buffer is 33 bytes, 1 byte for status and 32 byte for data.
  uint8_t rx_buffer[33 * 4];
  uint8_t tx_buffer[33 * 4];
};

extern BaseStationHub g_basestn_hub;

}  // namespace basestn
}  // namespace hitcon

#endif  // #ifndef LOGIC_BASESTN_HUB_DOT_H_
