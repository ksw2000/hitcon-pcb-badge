#ifndef HITCON_LOGIC_CDC_SERVICE_H_
#define HITCON_LOGIC_CDC_SERVICE_H_
#include "Service/Sched/Scheduler.h"
namespace hitcon {
namespace logic {
namespace cdc {
class CdcLogic {
 public:
  CdcLogic();
  void Init();

 private:
  void OnDataReceived(uint8_t* data, size_t len);
};
extern CdcLogic g_cdc_logic;
}  // namespace cdc
}  // namespace logic
}  // namespace hitcon
#endif  // HITCON_LOGIC_CDC_SERVICE_H_
