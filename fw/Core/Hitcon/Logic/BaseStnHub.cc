#include <Logic/BaseStnHub.h>

namespace hitcon {
namespace basestn {

BaseStationHub g_basestn_hub;

BaseStationHub::BaseStationHub() {}

bool BaseStationHub::WriteBuffer(uint16_t buffer_idx, uint8_t* data,
                                 size_t cnt) {
  // TODO
  return false;
}

bool BaseStationHub::ReadBuffer(uint16_t buffer_idx, uint8_t* data,
                                size_t cnt) {
  // TODO
  return false;
}

}  // namespace basestn
}  // namespace hitcon
