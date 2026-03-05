#!/usr/bin/env node
/**
 * Pure Node verification for Douyin resource API.
 *
 * Usage:
 *   node run-local.mjs
 *   A_BOGUS='...' MS_TOKEN='...' node run-local.mjs
 */

const BASE_URL = 'https://www.douyin.com/aweme/v1/web/solution/resource/list/';

const DEFAULTS = {
  spot_keys: '7359502129541449780_douyin_spec_theme',
  app_id: '6383',
  update_version_code: '170400',
  pc_client_type: '1',
  pc_libra_divert: 'Linux',
  support_h265: '0',
  support_dash: '0',
  cpu_core_num: '2',
  version_code: '170400',
  version_name: '17.4.0',
  cookie_enabled: 'true',
  screen_width: '1781',
  screen_height: '914',
  browser_language: 'en-US',
  browser_platform: 'Linux+x86_64',
  browser_name: 'Chrome',
  browser_version: '145.0.0.0',
  browser_online: 'true',
  engine_name: 'Blink',
  engine_version: '145.0.0.0',
  os_name: 'Linux',
  os_version: 'x86_64',
  device_memory: '4',
  platform: 'PC',
  downlink: '10',
  effective_type: '4g',
  round_trip_time: '100',
  webid: '7613781791376246308',
  msToken:
    process.env.MS_TOKEN ||
    'T3h_KlfP5vDj72CQydZqZIuj1pC-4hL9tjUp6LOaDfc5OA3NGp8RViyF3d_y6pd2KMArO6FIrqT5OsUa9DDogowvbF8VzjnBef5gkN-C4HWHFQMw2Zi0PShO-X9Ex9ZwyORoYs4Tfao9hrYx_PKVfcFexdsM-CL2APYjr0r5ksxPwy0JB1z0Ngo=',
  a_bogus:
    process.env.A_BOGUS ||
    'mf0VDeXLdx8cFd/tYCbuCncl27IANPuySBTObTeU7NiVPwzYxYPQzNtRnxuTsqR6v8B0ke17JEzlbxnc80tsZ99pzmpDumh61UV9nu0L8HZXb4Jg93ysejSTLk4eA5YzQAZGx/fvIUN9hElIwqN0UV5j7/kN4mUQBNnbkfRN73Av2mmag2xnCSmgPheGBsd6stb='
};

function buildUrl() {
  const qs = new URLSearchParams(DEFAULTS);
  return `${BASE_URL}?${qs.toString()}`;
}

async function main() {
  const url = buildUrl();
  const resp = await fetch(url, {
    headers: {
      accept: 'application/json, text/plain, */*',
      referer:
        'https://www.douyin.com/search/1?aid=6870d0d7-07d8-4846-93f5-82a4af13cb94&type=general',
      'user-agent':
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36'
    }
  });

  const text = await resp.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = null;
  }

  console.log('HTTP', resp.status);
  if (!data) {
    console.log('Non-JSON response:', text.slice(0, 300));
    process.exit(1);
  }

  console.log('status_code:', data.status_code);
  console.log('status_msg:', data.status_msg);
  console.log('resource_list length:', Array.isArray(data.resource_list) ? data.resource_list.length : -1);
  if (Array.isArray(data.resource_list) && data.resource_list.length > 0) {
    console.log('first resource:', {
      id: data.resource_list[0].id,
      name: data.resource_list[0].name,
      start_time: data.resource_list[0].start_time,
      end_time: data.resource_list[0].end_time
    });
  }

  if (resp.status !== 200 || data.status_code !== 0) {
    process.exit(2);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
