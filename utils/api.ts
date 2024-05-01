const config = useRuntimeConfig()

export const $api = $fetch.create({
  baseURL: config.public.apiBase,
  onResponseError({ response }) {
    if (response.status === 401) {
      navigateTo("/login")
    } else {
      console.log("[fetch request error]", response._data)
    }
  },
})
