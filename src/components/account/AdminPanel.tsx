"use client";

import { useEffect, useState } from "react";

type ReportStatus = "open" | "reviewing" | "resolved";

interface ReportRow {
  id: string;
  target_type: string;
  target_id: string;
  reason: string;
  status: ReportStatus;
  created_at: string;
}

const STATUS_LABEL: Record<ReportStatus, string> = {
  open: "OPEN",
  reviewing: "REVIEWING",
  resolved: "RESOLVED",
};

export function AdminPanel() {
  const [statusFilter, setStatusFilter] = useState<ReportStatus | "">("");
  const [reports, setReports] = useState<ReportRow[] | null>(null);
  const [reportError, setReportError] = useState<string | null>(null);

  const [flightUrl, setFlightUrl] = useState("");
  const [hotelUrl, setHotelUrl] = useState("");
  const [settingsMessage, setSettingsMessage] = useState<string | null>(null);
  const [settingsError, setSettingsError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const query = statusFilter ? `?status=${statusFilter}` : "";
      const response = await fetch(`/api/reports${query}`);
      if (cancelled) return;

      if (!response.ok) {
        setReportError("신고 목록을 불러오지 못했습니다.");
        setReports([]);
        return;
      }

      const body = await response.json();
      setReportError(null);
      setReports(body.reports ?? []);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [statusFilter]);

  async function updateReportStatus(id: string, status: ReportStatus) {
    const response = await fetch(`/api/admin/reports/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (response.ok) {
      setReports(
        (prev) =>
          prev?.map((report) =>
            report.id === id ? { ...report, status } : report,
          ) ?? null,
      );
    }
  }

  async function saveOutboundUrl(
    key: "outbound_flight_url_template" | "outbound_hotel_url_template",
    url: string,
  ) {
    setSettingsError(null);
    setSettingsMessage(null);
    const response = await fetch("/api/admin/settings/outbound", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, url }),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      setSettingsError(body.error ?? "저장에 실패했습니다.");
      return;
    }

    setSettingsMessage("저장되었습니다.");
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-base font-semibold text-[#1F2328]">신고 관리</h3>
        <div className="mt-3 flex gap-2">
          {(["", "open", "reviewing", "resolved"] as const).map((status) => (
            <button
              key={status || "all"}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                statusFilter === status
                  ? "bg-[#F2603C] text-white"
                  : "bg-[#F7F7F8] text-[#1F2328]"
              }`}
            >
              {status ? STATUS_LABEL[status] : "전체"}
            </button>
          ))}
        </div>

        {reportError && (
          <p role="alert" className="mt-3 text-sm text-[#C1272D]">
            {reportError}
          </p>
        )}

        <div className="mt-4 flex flex-col gap-3">
          {reports === null ? (
            <div className="h-32 animate-pulse rounded-[12px] bg-[#F7F7F8]" />
          ) : reports.length === 0 ? (
            <p className="text-sm text-[#6B7280]">
              조건에 맞는 신고가 없습니다.
            </p>
          ) : (
            reports.map((report) => (
              <div
                key={report.id}
                className="flex flex-col gap-2 rounded-[12px] border border-[#E4E4E7] p-4"
              >
                <p className="text-sm text-[#1F2328]">{report.reason}</p>
                <p className="text-xs text-[#6B7280]">
                  {report.target_type} · {STATUS_LABEL[report.status]}
                </p>
                <div className="flex gap-2">
                  {(["open", "reviewing", "resolved"] as const).map(
                    (status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => updateReportStatus(report.id, status)}
                        disabled={report.status === status}
                        className="rounded-full border border-[#E4E4E7] px-3 py-1 text-xs disabled:opacity-40"
                      >
                        {STATUS_LABEL[status]}
                      </button>
                    ),
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div>
        <h3 className="text-base font-semibold text-[#1F2328]">
          항공·숙소 외부 URL 설정
        </h3>
        <div className="mt-3 flex flex-col gap-3">
          <label className="flex flex-col gap-1 text-sm text-[#1F2328]">
            항공 검색 URL(HTTPS)
            <input
              className="h-[52px] rounded-[8px] border border-[#E4E4E7] px-4"
              value={flightUrl}
              onChange={(e) => setFlightUrl(e.target.value)}
            />
          </label>
          <button
            type="button"
            onClick={() =>
              saveOutboundUrl("outbound_flight_url_template", flightUrl)
            }
            className="flex h-11 w-fit items-center rounded-full bg-[#F2603C] px-5 text-sm font-semibold text-white"
          >
            항공 URL 저장
          </button>

          <label className="flex flex-col gap-1 text-sm text-[#1F2328]">
            숙소 검색 URL(HTTPS)
            <input
              className="h-[52px] rounded-[8px] border border-[#E4E4E7] px-4"
              value={hotelUrl}
              onChange={(e) => setHotelUrl(e.target.value)}
            />
          </label>
          <button
            type="button"
            onClick={() =>
              saveOutboundUrl("outbound_hotel_url_template", hotelUrl)
            }
            className="flex h-11 w-fit items-center rounded-full bg-[#F2603C] px-5 text-sm font-semibold text-white"
          >
            숙소 URL 저장
          </button>

          {settingsError && (
            <p role="alert" className="text-sm text-[#C1272D]">
              {settingsError}
            </p>
          )}
          {settingsMessage && (
            <p role="status" className="text-sm text-[#1E8E5A]">
              {settingsMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
