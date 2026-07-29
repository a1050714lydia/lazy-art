import { Resend } from "resend";
import RegisterSuccess from "@/emails/RegisterSuccess";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const {
      email,
      parentName,
      courseName,
    } = await req.json();

    const { error } = await resend.emails.send({
      from: "Lazy Art <onboarding@resend.dev>",
      to: email,
      subject: "🎨 Lazy Art｜報名成功通知",
      react: RegisterSuccess({
        parentName,
        courseName,
      }),
    });

    if (error) {
      return Response.json(error, { status: 400 });
    }

    return Response.json({ success: true });
  } catch (err) {
    return Response.json(err, { status: 500 });
  }
}