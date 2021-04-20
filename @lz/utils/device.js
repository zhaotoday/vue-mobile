export const device = {
  code: plus.device.uuid,
  systemType: `${plus.os.name}_${plus.os.version}`,
  phoneType: `${plus.device.vendor}_${plus.device.model}`,
};
