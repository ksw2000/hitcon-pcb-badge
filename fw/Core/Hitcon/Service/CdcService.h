#ifndef HITCON_SERVICE_CDC_SERVICE_H_
#define HITCON_SERVICE_CDC_SERVICE_H_

#include "Service/Sched/Scheduler.h"

extern "C" {
void CdcServiceOnDataReceived(uint8_t* data, size_t len);
}

namespace hitcon {
namespace service {
namespace cdc {

typedef void (*on_rx_callback_t)(void*, uint8_t*, size_t);

class CdcService {
 public:
  CdcService();
  void SetOnDataReceived(on_rx_callback_t callback, void* callback_arg1);
  void OnDataReceived(uint8_t* data, size_t len);

 private:
  on_rx_callback_t _on_rx_callback = nullptr;
  void* _on_rx_callback_arg1 = nullptr;
};

extern CdcService g_cdc_service;

}  // namespace cdc
}  // namespace service
}  // namespace hitcon
#endif  // HITCON_SERVICE_CDC_SERVICE_H_
