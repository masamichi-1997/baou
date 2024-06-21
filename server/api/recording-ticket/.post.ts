import { registerBetRecord } from "~/domains/recording-ticket";

export default defineEventHandler(async (event) => {
  const { form } = await readBody(event);
  await registerBetRecord(form);
  return {
    message: "API通信成功",
  };
});
