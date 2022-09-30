/* TOP_ICON_ID=<:top:1020472778119458826>
JGL_ICON_ID=<:jgl:1020472774466211860>
MID_ICON_ID=<:mid:1020472775632244897>
ADC_ICON_ID=<:adc:1020472773031768107>
BOT_ICON_ID=<:adc:1020472773031768107> */

import { Role } from "../constants/role";

export function getRoleEmoji(role: Role) {
  return process.env[`${role}_ICON_ID`] || role;
}
