#include "CdcService.h"

#include "usbd_cdc_if.h"
namespace hitcon {
namespace service {
namespace cdc {

CdcService g_cdc_service;

CdcService::CdcService() {}

void CdcService::SetOnDataReceived(on_rx_callback_t callback,
                                   void* callback_arg1) {
  _on_rx_callback = callback;
  _on_rx_callback_arg1 = callback_arg1;
}

void CdcService::OnDataReceived(uint8_t* data, size_t len) {
  if (_on_rx_callback != nullptr) {
    _on_rx_callback(_on_rx_callback_arg1, data, len);
  }
}

}  // namespace cdc
}  // namespace service
}  // namespace hitcon

void CdcServiceOnDataReceived(uint8_t* data, size_t len) {
  hitcon::service::cdc::g_cdc_service.OnDataReceived(data, len);
}
