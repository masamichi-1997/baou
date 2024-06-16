import { getTicketRegistrationInfo } from "~/domains/recording-ticket";

export default defineEventHandler(async (event) => {
  try {
    return await getTicketRegistrationInfo();
  } catch (error) {
    console.error(error);
    return createError({
      statusCode: 500,
      statusMessage: "内部サーバーエラーが発生しました。",
    });
  }
});
