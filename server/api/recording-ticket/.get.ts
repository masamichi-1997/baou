import { getTicketRegistrationInfo } from "~/domains/recording-ticket";

export default defineEventHandler(async () => {
  return await getTicketRegistrationInfo();
});
