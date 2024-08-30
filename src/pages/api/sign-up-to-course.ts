import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
  apiKey: 'cc9244feefcbd6e9d07ae268c0ab1174-us22',
  server: "us22",
});

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: any, res: any) => {
  if (req.method === "POST") {
    try {
      const response = await mailchimp.lists.addListMember("597607eaeb", req.body);
      res.status(200).json({ success: true, response });
    } catch (error: any) {
      res.status(500).json(error.response.text);
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
