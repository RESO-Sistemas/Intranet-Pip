var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { PdfGanttTaskbarCollection } from './pdf-taskbar';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { PointF, PdfPen, PdfColor } from '@syncfusion/ej2-pdf-export';
import { PdfTreeGrid } from './pdf-treegrid';
import { PdfTimeline } from './pdf-timeline';
import { pixelToPoint, pointToPixel } from '../base/utils';
import { PdfGanttPredecessor } from './pdf-connector-line';
import { EventMarker } from './pdf-event-marker';
/**
 *
 */
var PdfGantt = /** @class */ (function (_super) {
    __extends(PdfGantt, _super);
    function PdfGantt(parent) {
        var _this = _super.call(this) || this;
        _this.exportProps = {};
        _this.changeCloneProjectDates = false;
        _this.changeCloneTimelineDates = false;
        _this.currentPage = 0;
        _this.parent = parent;
        _this.chartHeader = new PdfTimeline(_this);
        _this.eventMarker = new EventMarker(parent);
        _this.predecessor = new PdfGanttPredecessor(parent, _this);
        _this.headerDetails = [];
        _this.pdfPageDetail = [];
        _this.taskbarCollection = [];
        _this.predecessorCollection = [];
        return _this;
    }
    Object.defineProperty(PdfGantt.prototype, "taskbar", {
        get: function () {
            if (isNullOrUndefined(this.taskbars)) {
                this.taskbars = new PdfGanttTaskbarCollection(this.parent);
            }
            return this.taskbars;
        },
        enumerable: true,
        configurable: true
    });
    PdfGantt.prototype.drawChart = function (result) {
        this.result = result;
        this.totalPages = this.result.page.section.count;
        this.perColumnPages = this.totalPages / this.layouter.columnRanges.length;
        this.calculateRange();
        this.drawGantttChart();
        this.drawPageBorder();
    };
    //Calcualte the header range for each pdf page based on schedule start and end date.
    PdfGantt.prototype.calculateRange = function () {
        var lastColumnRange = this.layouter.columnRanges[this.layouter.columnRanges.length - 1];
        var totalColumnWidth = 0;
        var isPageFinished = true;
        var pageWidth = 0;
        var remainWidth = 0;
        var point = 0;
        var endDays1;
        var headerWidth = pixelToPoint(this.chartHeader.width);
        var timelineSettings = this.parent.timelineModule;
        var isFitToFullGrid = this.parent.pdfExportModule.helper['shouldProcessChart']();
        for (var index = lastColumnRange[0]; index <= lastColumnRange[1]; index++) {
            totalColumnWidth += this.layouter.treegrid.columns.getColumn(index).width;
        }
        totalColumnWidth += 0.5;
        if (totalColumnWidth + 100 < this.result.page.getClientSize().width || !isFitToFullGrid) {
            remainWidth = this.result.page.getClientSize().width - totalColumnWidth;
            this.chartPageIndex = this.startPageIndex = this.totalPages - this.perColumnPages;
            isPageFinished = false;
            this.startPoint = new PointF(totalColumnWidth, 0);
        }
        else {
            this.result.page.section.add();
            this.chartPageIndex = this.startPageIndex = this.totalPages;
            isPageFinished = true;
            this.startPoint = new PointF(point, 0);
        }
        while (Math.round(point) < Math.round(headerWidth)) {
            if (isPageFinished) {
                pageWidth = this.result.page.getClientSize().width;
            }
            else {
                pageWidth = remainWidth;
                isPageFinished = true;
            }
            var detail = {};
            var range = [];
            var convertedWidth = pixelToPoint(this.chartHeader.bottomTierCellWidth);
            var width = 0;
            if (this.chartHeader.bottomTierCellWidth !== 0) {
                width = (Math.floor(pageWidth / convertedWidth) * convertedWidth);
            }
            range[0] = point;
            // Calculate time offset if project starts with a specific time (not midnight)
            var timeOffsetWidth = 0;
            if (point === 0 && this.parent.timelineModule.timelineStartDate) {
                var startDate = this.parent.timelineModule.timelineStartDate;
                var hours = startDate.getHours();
                var minutes = startDate.getMinutes();
                var seconds = startDate.getSeconds();
                // Calculate time offset ratio based on the schedule type
                if (hours !== 0 || minutes !== 0 || seconds !== 0) {
                    var scheduleType_1 = timelineSettings.customTimelineSettings.bottomTier.unit;
                    if (scheduleType_1 === 'None') {
                        scheduleType_1 = timelineSettings.customTimelineSettings.topTier.unit;
                    }
                    var timeOffsetRatio = 0;
                    // Calculate the fractional offset based on timeline unit
                    if (scheduleType_1 === 'Minutes') {
                        timeOffsetRatio = seconds / 60;
                    }
                    else if (scheduleType_1 === 'Hour') {
                        var totalMinutesInHour = 60;
                        timeOffsetRatio = minutes / totalMinutesInHour;
                    }
                    else if (scheduleType_1 === 'Day' || scheduleType_1 === 'Week') {
                        var totalSecondsInDay = 24 * 60 * 60;
                        var currentSeconds = (hours * 60 * 60) + (minutes * 60) + seconds;
                        timeOffsetRatio = currentSeconds / totalSecondsInDay;
                    }
                    // Calculate the width to subtract for the partial cell at the start
                    if (timeOffsetRatio > 0) {
                        timeOffsetWidth = convertedWidth * timeOffsetRatio;
                        width = width - timeOffsetWidth;
                    }
                }
            }
            if (headerWidth - point <= width) {
                range[1] = headerWidth;
                detail.totalWidth = pointToPixel(headerWidth - point);
            }
            else {
                range[1] = point + width;
                detail.totalWidth = pointToPixel(width);
            }
            detail.startPoint = range[0];
            detail.endPoint = range[1];
            if (this.parent.projectStartDate && this.parent.cloneProjectStartDate.getHours() === 0 &&
                this.parent.cloneProjectStartDate.getMinutes() === 0
                && this.parent.cloneProjectStartDate.getSeconds() === 0) {
                this.changeCloneProjectDates = true;
                this.parent.cloneProjectStartDate.setHours(8);
            }
            if (this.parent.timelineSettings.viewStartDate &&
                !isNullOrUndefined(this.parent.cloneTimelineStartDate) &&
                this.parent.cloneTimelineStartDate.getHours() === 0 &&
                this.parent.cloneTimelineStartDate.getMinutes() === 0 &&
                this.parent.cloneTimelineStartDate.getSeconds() === 0) {
                this.changeCloneTimelineDates = true;
                this.parent.cloneTimelineStartDate.setHours(8);
            }
            var timelineStartDate = this.parent.dataOperation.getDateFromFormat(this.parent.timelineModule.timelineStartDate);
            var count = timelineSettings.customTimelineSettings.bottomTier.count;
            if (isNullOrUndefined(count)) {
                count = timelineSettings.customTimelineSettings.topTier.count;
            }
            var scheduleType = timelineSettings.customTimelineSettings.bottomTier.unit === 'None' ?
                timelineSettings.customTimelineSettings.topTier.unit : timelineSettings.customTimelineSettings.bottomTier.unit;
            switch (scheduleType) {
                case 'Minutes':
                    {
                        detail.startDate = new Date(timelineStartDate.getTime());
                        var sDays = Math.floor(pointToPixel(detail.startPoint) / (this.chartHeader.bottomTierCellWidth));
                        detail.startDate.setMinutes(detail.startDate.getMinutes() + sDays * count);
                        detail.startDate.setSeconds(detail.startDate.getSeconds() + 1);
                        detail.endDate = new Date(detail.startDate.getTime());
                        var eDays = Math.floor(pointToPixel(detail.endPoint - detail.startPoint)
                            / (this.chartHeader.bottomTierCellWidth));
                        detail.endDate.setMinutes(detail.endDate.getMinutes() + eDays * count);
                        break;
                    }
                case 'Hour':
                    {
                        detail.startDate = new Date(timelineStartDate.getTime());
                        var startHours = Math.floor(pointToPixel(detail.startPoint) / (this.chartHeader.bottomTierCellWidth));
                        var currentDate = new Date(detail.startDate.getTime());
                        if (!this.parent.timelineSettings.showWeekend) {
                            currentDate = this.calculateHoursWithoutNonworkingDays(currentDate, startHours, count);
                            detail.startDate = new Date(currentDate.getTime());
                        }
                        else {
                            detail.startDate.setHours(detail.startDate.getHours() + startHours * count);
                            detail.startDate.setMinutes(detail.startDate.getMinutes() + 1);
                        }
                        var endHours = Math.floor((detail.endPoint - detail.startPoint)
                            / pointToPixel(this.chartHeader.bottomTierCellWidth));
                        currentDate = new Date(detail.startDate.getTime());
                        if (!this.parent.timelineSettings.showWeekend) {
                            currentDate = this.calculateHoursWithoutNonworkingDays(currentDate, endHours, count);
                        }
                        else {
                            currentDate.setHours(currentDate.getHours() + endHours * count);
                        }
                        detail.endDate = new Date(currentDate.getTime());
                        break;
                    }
                case 'Day':
                    {
                        detail.startDate = new Date(timelineStartDate.getTime());
                        var startDays = Math.round(detail.startPoint / pixelToPoint(this.chartHeader.bottomTierCellWidth));
                        var currentDate = new Date(detail.startDate.getTime());
                        if (!this.parent.timelineSettings.showWeekend) {
                            detail.startDate = this.calculateDaysWithoutNonworkingDays(detail.startDate, startDays * count);
                        }
                        else {
                            detail.startDate.setDate(detail.startDate.getDate() + startDays * count);
                        }
                        var endDays = Math.round((detail.endPoint - detail.startPoint)
                            / pixelToPoint(this.chartHeader.bottomTierCellWidth)) - 1;
                        var startdate = detail.startDate;
                        startdate.setHours(0, 0, 0, 0);
                        currentDate = new Date(detail.startDate.getTime());
                        if (!this.parent.timelineSettings.showWeekend) {
                            currentDate = this.calculateDaysWithoutNonworkingDays(currentDate, endDays * count);
                        }
                        else {
                            currentDate.setDate(currentDate.getDate() + endDays * count);
                        }
                        var secondsToAdd = this.parent.workingTimeRanges[this.parent.workingTimeRanges.length - 1].to * 1000;
                        detail.endDate = new Date(currentDate.getTime());
                        detail.endDate.setTime(detail.endDate.getTime() + secondsToAdd);
                        break;
                    }
                case 'Week':
                    {
                        detail.startDate = new Date(timelineStartDate.getTime());
                        var startDays1 = (detail.startPoint / pixelToPoint(this.chartHeader.bottomTierCellWidth) * 7);
                        if (!this.parent.timelineSettings.showWeekend) {
                            detail.startDate = this.calculateDaysWithoutNonworkingDays(detail.startDate, startDays1 * count);
                        }
                        else {
                            detail.startDate.setDate(detail.startDate.getDate() + startDays1 * count);
                        }
                        if (this.parent.pdfExportModule.gantt.taskbar.isAutoFit()) {
                            endDays1 = Math.round((detail.endPoint - detail.startPoint)
                                / pixelToPoint(this.chartHeader.bottomTierCellWidth) * 7 - 1);
                        }
                        else {
                            endDays1 = Math.round((detail.endPoint - detail.startPoint)
                                / pixelToPoint(this.chartHeader.bottomTierCellWidth)) * 7 - 1;
                        }
                        detail.endDate = new Date(detail.startDate.getTime());
                        if (!this.parent.timelineSettings.showWeekend) {
                            detail.endDate = this.calculateDaysWithoutNonworkingDays(detail.endDate, endDays1 * count);
                        }
                        else {
                            detail.endDate.setDate(detail.startDate.getDate() + endDays1 * count);
                        }
                        break;
                    }
                case 'Month':
                    {
                        detail.startDate = new Date(timelineStartDate.getTime());
                        var startDays2 = (detail.startPoint / pixelToPoint(this.chartHeader.bottomTierCellWidth) * 31);
                        detail.startDate.setDate(detail.startDate.getDate() + startDays2 * count);
                        var endDays2 = Math.round((detail.endPoint - detail.startPoint)
                            / pixelToPoint(this.chartHeader.bottomTierCellWidth)) * 31 - 1;
                        detail.endDate = new Date(detail.startDate.getTime());
                        detail.endDate.setDate(detail.startDate.getDate() + endDays2 * count);
                        break;
                    }
                case 'Year':
                    {
                        detail.startDate = new Date(timelineStartDate.getTime());
                        var startDays3 = (detail.startPoint / pixelToPoint(this.chartHeader.bottomTierCellWidth) * 365);
                        detail.startDate.setDate(detail.startDate.getDate() + startDays3 * count);
                        var endDays3 = Math.round((detail.endPoint - detail.startPoint)
                            / pixelToPoint(this.chartHeader.bottomTierCellWidth)) * 365 - 1;
                        detail.endDate = new Date(detail.startDate.getTime());
                        detail.endDate.setDate(detail.startDate.getDate() + endDays3 * count);
                        break;
                    }
            }
            this.headerDetails.push(detail);
            point += width;
        }
    };
    /**
     * Calculates the end date by adding the specified number of working hours to the current date,
     * excluding any non-working days as specified in the nonWorkingDayIndex.
     *
     * @param {Date} currentDate - The starting date from which to begin adding working hours.
     * @param {number} startHours - The number of hours to add to the current date.
     * @param {number} count - A multiplier to apply to the startHours, typically representing a scaling factor.
     * @returns {Date} - A new Date object representing the calculated date/time after working hours have been added.
     *
     */
    PdfGantt.prototype.calculateHoursWithoutNonworkingDays = function (currentDate, startHours, count) {
        var totalHours = 0;
        while (totalHours < startHours * count) {
            currentDate.setHours(currentDate.getHours() + 1);
            if (this.parent.nonWorkingDayIndex.indexOf(currentDate.getDay()) === -1) {
                totalHours++;
            }
            if (this.parent.nonWorkingDayIndex.indexOf(currentDate.getDay()) !== -1) {
                currentDate.setHours(24, 0, 0, 0);
            }
        }
        return currentDate;
    };
    /**
     * Calculates the end date by adding the specified number of working days to the current date,
     * excluding any non-working days as defined in the nonWorkingDayIndex.
     *
     * @param {Date} startDate - The starting date from which to begin adding working days.
     * @param {number} daysToAdd - The number of days to add to the current date.
     * @param {number} count - A multiplier applied to daysToAdd, typically representing the number of units.
     * @returns {Date} - A new Date object representing the calculated date after working days have been added.
     *
     */
    PdfGantt.prototype.calculateDaysWithoutNonworkingDays = function (startDate, daysToAdd) {
        var result = new Date(startDate.getTime());
        var nonWorkingDays = this.parent.nonWorkingDayIndex.length;
        var workingDaysInWeek = 7 - nonWorkingDays;
        var fullWeeks = Math.floor(daysToAdd / workingDaysInWeek);
        var remainingDays = daysToAdd % workingDaysInWeek;
        result.setDate(result.getDate() + fullWeeks * 7);
        // Process remaining days
        while (remainingDays > 0) {
            result.setDate(result.getDate() + 1);
            if (this.parent.nonWorkingDayIndex.indexOf(result.getDay()) === -1) {
                remainingDays--;
            }
        }
        return result;
    };
    PdfGantt.prototype.drawPageBorder = function () {
        var pages = this.result.page.section.getPages();
        for (var index = 0; index < pages.length; index++) {
            var page = pages[index];
            var graphics = page.graphics;
            var pageSize = page.getClientSize();
            var pen = new PdfPen(new PdfColor(this.ganttStyle.chartGridLineColor));
            graphics.drawRectangle(pen, 0, 0, pageSize.width, pageSize.height);
        }
    };
    //Draw the gantt chart side
    PdfGantt.prototype.drawGantttChart = function () {
        var _this = this;
        var taskbarPoint = this.startPoint;
        var pagePoint = new PointF();
        var pageStartX = 0;
        var cumulativeWidth = 0;
        var cumulativeHeight = 0;
        var pageData;
        this.headerDetails.forEach(function (detail, index) {
            _this.currentPage = 0;
            var page = _this.result.page.section.getPages()[_this.startPageIndex];
            page['contentWidth'] = (_this.parent.pdfExportModule.gantt.taskbar.isAutoFit()) ? pointToPixel(_this.headerDetails[index].endPoint - _this.headerDetails[index].startPoint) : _this.headerDetails[index].endPoint - _this.headerDetails[index].startPoint;
            _this.chartHeader.drawTimeline(page, _this.startPoint, detail, 0);
            taskbarPoint.y = taskbarPoint.y + pixelToPoint(_this.parent.timelineModule.isSingleTier ? 45 : 60); // headerHeight
            pageStartX = taskbarPoint.x;
            cumulativeHeight = pixelToPoint(_this.parent.timelineModule.isSingleTier ? 45 : 60); // headerHeight
            _this.headerDetails[_this.headerDetails.indexOf(detail)].startIndex = _this.startPageIndex;
            _this.headerDetails[_this.headerDetails.indexOf(detail)].pageStartPoint = taskbarPoint;
            for (var i = 0; i < _this.taskbarCollection.length; i++) {
                var task = _this.taskbarCollection[i];
                var rowHeight = _this.rows.getRow(i + 1).height;
                var pdfPage = _this.result.page.section.getPages()[_this.startPageIndex];
                var graphics = pdfPage.graphics;
                var pen = new PdfPen(new PdfColor(_this.ganttStyle.chartGridLineColor));
                var lineWidth = void 0;
                if (page['contentWidth'] && (_this.parent.gridLines === 'Both' || _this.parent.gridLines === 'Horizontal')) {
                    lineWidth = _this.chartHeader.timelineWidth;
                    graphics.drawRectangle(pen, pageStartX, taskbarPoint.y, page['contentWidth'] + 0.5, rowHeight);
                }
                var isNextPage = task.drawTaskbar(pdfPage, taskbarPoint, detail, cumulativeWidth, rowHeight, _this.taskbarCollection[parseInt(i.toString(), 10)], lineWidth, index);
                if (isNextPage) {
                    if (_this.enableHeader) {
                        taskbarPoint.y = pixelToPoint(_this.parent.timelineModule.isSingleTier ? 45 : 60);
                    }
                    else {
                        taskbarPoint.y = 0;
                    }
                    _this.startPageIndex++;
                    pageData = {};
                    pageData.height = cumulativeHeight;
                    pageData.pageStartX = pageStartX;
                    pageData.startPoint = Object.assign({}, pagePoint);
                    if (_this.parent.pdfExportModule.gantt.taskbar.isAutoFit()) {
                        pageData.width = (detail.totalWidth);
                    }
                    else {
                        pageData.width = pixelToPoint(detail.totalWidth);
                    }
                    _this.pdfPageDetail.push(pageData);
                    pagePoint.y += pageData.height;
                    if (_this.enableHeader) {
                        cumulativeHeight = _this.chartHeader.height;
                    }
                    else {
                        taskbarPoint.y = 0;
                        cumulativeHeight = 0;
                    }
                }
                taskbarPoint.y += rowHeight;
                cumulativeHeight += rowHeight;
                _this.eventMarker.renderHeight = _this.layouter.pageHeightCollection[_this.currentPage].totalHeight;
                _this.parent.eventMarkerColloction.map(function (eventMarker) {
                    var timelimeHeight = pixelToPoint(_this.parent.timelineModule.isSingleTier ? 45 : 60);
                    if (_this.currentPage !== 0) {
                        _this.eventMarker.renderHeight = _this.layouter.pageHeightCollection[_this.currentPage].totalHeight + timelimeHeight;
                    }
                    var pdfPage = _this.result.page.section.getPages()[_this.startPageIndex];
                    _this.eventMarker.drawEventMarker(pdfPage, taskbarPoint, cumulativeWidth, detail, eventMarker, timelimeHeight, _this.ganttStyle);
                });
            }
            _this.headerDetails[index].endIndex = _this.startPageIndex;
            cumulativeWidth += detail.totalWidth;
            pageData = {};
            pageData.height = cumulativeHeight;
            pageData.pageStartX = pageStartX;
            pageData.startPoint = Object.assign({}, pagePoint);
            if (_this.parent.pdfExportModule.gantt.taskbar.isAutoFit()) {
                pageData.width = (detail.totalWidth);
            }
            else {
                pageData.width = pixelToPoint(detail.totalWidth);
            }
            _this.pdfPageDetail.push(pageData);
            pagePoint.x += pageData.width;
            pagePoint.y = 0;
            if (_this.enableHeader) {
                cumulativeHeight = _this.chartHeader.height;
            }
            else {
                taskbarPoint.y = 0;
            }
            if (_this.headerDetails.indexOf(detail) !== _this.headerDetails.length - 1) {
                _this.result.page.section.add();
                _this.startPageIndex = _this.result.page.section.count - 1;
                taskbarPoint = _this.startPoint = new PointF(0, 0);
            }
        });
        // Draw predecessor line.
        for (var i = 0; i < this.predecessorCollection.length; i++) {
            var predecessor = this.predecessorCollection[i];
            predecessor.drawPredecessor(this);
        }
    };
    return PdfGantt;
}(PdfTreeGrid));
export { PdfGantt };
