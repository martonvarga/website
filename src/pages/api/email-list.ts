import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
  apiKey: process.env.API_KEY,
  server: "us22",
  // apiKey: "438a44f0015a5f90eba07a818ca6d341-us22",
  // server: "us22",
});

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: any, res: any) => {
  if (req.method === "POST") {
    const { email_address } = req.body;

    try {
      const response = await mailchimp.lists.addListMember(
        process.env.AUDIENCE_LIST_ID!,
        {
          email_address,
          status: "subscribed",
        }
      );
      res.status(200).json({ success: true, response });
    } catch (error: any) {
      res.status(500).json(error.response.text);
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
