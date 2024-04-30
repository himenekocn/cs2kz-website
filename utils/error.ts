export function toErrorMsg(error: any) {
  if (typeof error.response.data !== "object") {
    return `${error.response.data}`
  }

  if (error.response.data.debug_info) {
    return `${error.response.data.debug_info}, ${error.response.data.message}`
  }

  return `${error.response.data.message}`
}
