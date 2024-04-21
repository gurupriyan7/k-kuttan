import axios from "axios";
import { sendMailData } from "../interface/app.interface.js";
import { appConfig } from "../config/appConfig.js";

export const sendEmail = async (mailData: sendMailData): Promise<boolean> => {
  console.log(appConfig.sibKey, "sibkey", appConfig.sibSource);

  try {
    const headers = {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": appConfig.sibKey,
    };
    const { to, text, subject } = mailData;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = await axios.post(
      appConfig.sibUrl,
      {
        sender: {
          email: appConfig.sibSource,
        },
        to: [
          {
            email: to,
          },
        ],
        subject,
        htmlContent: text,
      },
      {
        headers,
      },
    );

    return true;
  } catch (err: any) {
    console.log(err?.message, "errorsfsffsfgf");
    return false;
  }
};
