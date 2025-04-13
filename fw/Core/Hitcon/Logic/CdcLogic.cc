#include "CdcLogic.h"

#include "Service/CdcService.h"

using namespace hitcon::service::cdc;

namespace hitcon {
namespace logic {
namespace cdc {

CdcLogic g_cdc_logic;

CdcLogic::CdcLogic() {}

void CdcLogic::Init() {
  g_cdc_service.SetOnDataReceived((on_rx_callback_t)&CdcLogic::OnDataReceived,
                                  this);
}

void CdcLogic::OnDataReceived(uint8_t* data, size_t len) {}

}  // namespace cdc
}  // namespace logic
}  // namespace hitcon
