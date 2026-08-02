import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    console.log("📨 收到寄信 API");

    const { email, parentName, courseName } = await req.json();

    console.log("Email：", email);
    console.log("家長：", parentName);
    console.log("課程：", courseName);

    if (!email) {
      return Response.json(
        { message: "沒有收到 Email" },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Lazy Art <onboarding@resend.dev>",
      to: email,
      subject: "🎨 Lazy Art｜報名成功通知",

      html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:32px;background:#ffffff;border-radius:12px;border:1px solid #eee;">

        <h2 style="color:#8B1E2D;">🎨 Lazy Art 懶得畫室</h2>

        <p>親愛的 <strong>${parentName}</strong> 您好：</p>

        <p>
          感謝您報名
          <strong>${courseName}</strong>！
        </p>

        <p>
          我們已收到您的報名資料，
          完成付款後將為您保留名額。
        </p>

        <hr style="margin:24px 0;" />

        <h3>📍 教室地址</h3>

        <p>
          台北市中山區龍江路209巷17號2樓
        </p>

        <hr style="margin:24px 0;" />

        <h3>💳 付款方式</h3>

        <p>
          完成匯款／轉帳後，
          請加入官方 LINE，
          並提供：
        </p>

        <ul>
          <li>家長姓名</li>
          <li>報名課程</li>
          <li>匯款帳號後五碼</li>
        </ul>

        <p>
          <a
            href="https://lin.ee/UPkos4l"
            style="
              display:inline-block;
              padding:12px 20px;
              background:#8B1E2D;
              color:white;
              text-decoration:none;
              border-radius:999px;
            "
          >
            加入官方 LINE
          </a>
        </p>

        <hr style="margin:24px 0;" />

        <p>期待與您及孩子在課堂上見面！</p>

        <p style="margin-top:32px;">
          <strong>Lazy Art 懶得畫室</strong>
        </p>

      </div>
      `,
    });

    console.log("Resend data：", data);
    console.log("Resend error：", error);

    if (error) {
      return Response.json(error, { status: 400 });
    }

    return Response.json({
      success: true,
      data,
    });
  } catch (err) {
    console.error("寄信失敗：", err);

    return Response.json(
      {
        success: false,
        message: "寄信失敗",
      },
      {
        status: 500,
      }
    );
  }
}