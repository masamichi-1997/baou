export default defineEventHandler(async (event) => {
  const { form } = await readBody(event);
  console.log(form)
  return {
    message: "API通信成功"
  }
});
