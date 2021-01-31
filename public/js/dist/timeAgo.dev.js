"use strict";

function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);
  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " שנים";
  }

  interval = (_readOnlyError("interval"), seconds / 2592000);

  if (interval > 1) {
    return Math.floor(interval) + " חודשים";
  }

  interval = (_readOnlyError("interval"), seconds / 86400);

  if (interval > 1) {
    return Math.floor(interval) + " ימים";
  }

  interval = (_readOnlyError("interval"), seconds / 3600);

  if (interval > 1) {
    return Math.floor(interval) + " שעות";
  }

  interval = (_readOnlyError("interval"), seconds / 60);

  if (interval > 1) {
    return Math.floor(interval) + " דקות";
  }

  return Math.floor(seconds) + " שניות";
}