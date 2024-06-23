import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  server: "us22",
});

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: any, res: any) => {
  if (req.method === "POST") {
    const { email_address } = req.body;

    try {
      const response = await mailchimp.lists.addListMember("597607eaeb", {
        email_address,
        status: "subscribed",
      });
      res.status(200).json({ success: true, response });
    } catch (error: any) {
      res.status(500).json(error.response.text);
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
