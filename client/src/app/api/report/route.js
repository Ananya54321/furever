import Report from "../../../../db/schema/report.schema";
import { connectToDatabase } from "@/../db/dbConfig";
import { NextResponse } from "next/server";
import { getUserByToken } from "@/../actions/userActions";

connectToDatabase();

export async function GET(request) {
  try {
    const upcomingReports = await Report.find().sort({ reportDate: 1 }).lean();
    return NextResponse.json({
      success: true,
      message: "Reports fetched successfully",
      reports: upcomingReports,
    });
  } catch (err) {
    console.error("Error in GET reports:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const body = await request.json();
  const { reportData, token } = body;
  const response = await getUserByToken(token, "user");
  if (!response.success) {
    return NextResponse.json(
      { success: false, error: response.message },
      { status: 401 }
    );
  }
  const user = response.user;
  if (!user) {
    return NextResponse.json(
      {
        success: false,
        error: "User not found",
      },
      { status: 400 }
    );
  }
  try {
    const report = new Report({
      ...reportData,
      organisedBy: user._id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await report.save();
    return NextResponse.json({
      success: true,
      message: "New report added successfully",
      report: report,
    });
  } catch (err) {
    console.error("Error in POST report:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
