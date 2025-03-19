import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    // SQL queries for analytics data
    const activeVisitorsQuery = `
      SELECT COUNT(DISTINCT session_id) as active_visitors
      FROM analitik_pengunjung
      WHERE timestamp >= NOW() - INTERVAL '5 minutes'
    `;
    
    const todayVisitsQuery = `
      SELECT COUNT(*) as total_visits
      FROM analitik_pengunjung
      WHERE DATE(timestamp) = CURRENT_DATE
    `;
    
    const uniqueVisitorsQuery = `
      SELECT COUNT(DISTINCT session_id) as unique_visitors
      FROM analitik_pengunjung
      WHERE DATE(timestamp) = CURRENT_DATE
    `;

    // Execute all queries concurrently
    const [activeVisitorsResult, todayVisitsResult, uniqueVisitorsResult] = await Promise.all([
      query(activeVisitorsQuery),
      query(todayVisitsQuery),
      query(uniqueVisitorsQuery),
    ]);

    // Prepare response data with proper type checking and defaults
    const data = {
      activeVisitors: Number(activeVisitorsResult.rows?.[0]?.active_visitors || 0),
      todayVisits: Number(todayVisitsResult.rows?.[0]?.total_visits || 0),
      uniqueVisitors: Number(uniqueVisitorsResult.rows?.[0]?.unique_visitors || 0),
      timestamp: new Date().toISOString(),
    };

    // Return JSON response with appropriate headers
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
