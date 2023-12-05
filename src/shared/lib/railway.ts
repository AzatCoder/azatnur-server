export const right = <T>(data: T) => ({
  success: true as true,
  data
});

export const left = (reason?: string) => ({
  success: false as false,
  reason
});
