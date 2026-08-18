import React from 'react';

export function SystemStatus({ isSuccess, isError, isLoading }) {
  return (
    <div className="panel-module p-6 flex flex-col">
      <div className="label-plate">System Status</div>

      <div className="flex-1 flex flex-col justify-center gap-4 mt-4">
        <div className="flex items-center justify-between border-b border-[#2d372d] pb-2">
          <span className="font-['IBM_Plex_Sans'] text-xs font-semibold text-[#dec0b4] tracking-widest">
            TELEMETRY LINK
          </span>
          <div className="flex items-center gap-2">
            <span className="font-['JetBrains_Mono'] text-xs text-[#ffb596]">ACTIVE</span>
            <div className="indicator-lamp active" />
          </div>
        </div>

        <div className="flex items-center justify-between border-b border-[#2d372d] pb-2">
          <span className="font-['IBM_Plex_Sans'] text-xs font-semibold text-[#dec0b4] tracking-widest">
            DATA PIPELINE
          </span>
          <div className="flex items-center gap-2">
            <span className="font-['JetBrains_Mono'] text-xs text-[#ffb596]">
              {isLoading ? 'SYNCING' : isError ? 'FAULT' : 'STABLE'}
            </span>
            <div className={`indicator-lamp ${isError ? '' : 'orange-active'}`} />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-['IBM_Plex_Sans'] text-xs font-semibold text-[#dec0b4] tracking-widest">
            ANOMALY DETECT
          </span>
          <div className="flex items-center gap-2">
            <span className="font-['JetBrains_Mono'] text-xs text-[#2d372d]">STANDBY</span>
            <div className="indicator-lamp" />
          </div>
        </div>
      </div>
    </div>
  );
}
