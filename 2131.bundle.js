"use strict";(self.webpackChunkcollab_notes=self.webpackChunkcollab_notes||[]).push([[2131],{82131:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "getCLS": () => (/* binding */ h),\n/* harmony export */   "getFCP": () => (/* binding */ p),\n/* harmony export */   "getFID": () => (/* binding */ L),\n/* harmony export */   "getLCP": () => (/* binding */ F),\n/* harmony export */   "getTTFB": () => (/* binding */ P)\n/* harmony export */ });\nvar e,t,n,i,r=function(e,t){return{name:e,value:void 0===t?-1:t,delta:0,entries:[],id:"v2-".concat(Date.now(),"-").concat(Math.floor(8999999999999*Math.random())+1e12)}},a=function(e,t){try{if(PerformanceObserver.supportedEntryTypes.includes(e)){if("first-input"===e&&!("PerformanceEventTiming"in self))return;var n=new PerformanceObserver((function(e){return e.getEntries().map(t)}));return n.observe({type:e,buffered:!0}),n}}catch(e){}},o=function(e,t){var n=function n(i){"pagehide"!==i.type&&"hidden"!==document.visibilityState||(e(i),t&&(removeEventListener("visibilitychange",n,!0),removeEventListener("pagehide",n,!0)))};addEventListener("visibilitychange",n,!0),addEventListener("pagehide",n,!0)},c=function(e){addEventListener("pageshow",(function(t){t.persisted&&e(t)}),!0)},u=function(e,t,n){var i;return function(r){t.value>=0&&(r||n)&&(t.delta=t.value-(i||0),(t.delta||void 0===i)&&(i=t.value,e(t)))}},f=-1,s=function(){return"hidden"===document.visibilityState?0:1/0},m=function(){o((function(e){var t=e.timeStamp;f=t}),!0)},v=function(){return f<0&&(f=s(),m(),c((function(){setTimeout((function(){f=s(),m()}),0)}))),{get firstHiddenTime(){return f}}},p=function(e,t){var n,i=v(),o=r("FCP"),f=function(e){"first-contentful-paint"===e.name&&(m&&m.disconnect(),e.startTime<i.firstHiddenTime&&(o.value=e.startTime,o.entries.push(e),n(!0)))},s=window.performance&&performance.getEntriesByName&&performance.getEntriesByName("first-contentful-paint")[0],m=s?null:a("paint",f);(s||m)&&(n=u(e,o,t),s&&f(s),c((function(i){o=r("FCP"),n=u(e,o,t),requestAnimationFrame((function(){requestAnimationFrame((function(){o.value=performance.now()-i.timeStamp,n(!0)}))}))})))},d=!1,l=-1,h=function(e,t){d||(p((function(e){l=e.value})),d=!0);var n,i=function(t){l>-1&&e(t)},f=r("CLS",0),s=0,m=[],v=function(e){if(!e.hadRecentInput){var t=m[0],i=m[m.length-1];s&&e.startTime-i.startTime<1e3&&e.startTime-t.startTime<5e3?(s+=e.value,m.push(e)):(s=e.value,m=[e]),s>f.value&&(f.value=s,f.entries=m,n())}},h=a("layout-shift",v);h&&(n=u(i,f,t),o((function(){h.takeRecords().map(v),n(!0)})),c((function(){s=0,l=-1,f=r("CLS",0),n=u(i,f,t)})))},g={passive:!0,capture:!0},y=new Date,T=function(i,r){e||(e=r,t=i,n=new Date,S(removeEventListener),E())},E=function(){if(t>=0&&t<n-y){var r={entryType:"first-input",name:e.type,target:e.target,cancelable:e.cancelable,startTime:e.timeStamp,processingStart:e.timeStamp+t};i.forEach((function(e){e(r)})),i=[]}},w=function(e){if(e.cancelable){var t=(e.timeStamp>1e12?new Date:performance.now())-e.timeStamp;"pointerdown"==e.type?function(e,t){var n=function(){T(e,t),r()},i=function(){r()},r=function(){removeEventListener("pointerup",n,g),removeEventListener("pointercancel",i,g)};addEventListener("pointerup",n,g),addEventListener("pointercancel",i,g)}(t,e):T(t,e)}},S=function(e){["mousedown","keydown","touchstart","pointerdown"].forEach((function(t){return e(t,w,g)}))},L=function(n,f){var s,m=v(),p=r("FID"),d=function(e){e.startTime<m.firstHiddenTime&&(p.value=e.processingStart-e.startTime,p.entries.push(e),s(!0))},l=a("first-input",d);s=u(n,p,f),l&&o((function(){l.takeRecords().map(d),l.disconnect()}),!0),l&&c((function(){var a;p=r("FID"),s=u(n,p,f),i=[],t=-1,e=null,S(addEventListener),a=d,i.push(a),E()}))},b={},F=function(e,t){var n,i=v(),f=r("LCP"),s=function(e){var t=e.startTime;t<i.firstHiddenTime&&(f.value=t,f.entries.push(e),n())},m=a("largest-contentful-paint",s);if(m){n=u(e,f,t);var p=function(){b[f.id]||(m.takeRecords().map(s),m.disconnect(),b[f.id]=!0,n(!0))};["keydown","click"].forEach((function(e){addEventListener(e,p,{once:!0,capture:!0})})),o(p,!0),c((function(i){f=r("LCP"),n=u(e,f,t),requestAnimationFrame((function(){requestAnimationFrame((function(){f.value=performance.now()-i.timeStamp,b[f.id]=!0,n(!0)}))}))}))}},P=function(e){var t,n=r("TTFB");t=function(){try{var t=performance.getEntriesByType("navigation")[0]||function(){var e=performance.timing,t={entryType:"navigation",startTime:0};for(var n in e)"navigationStart"!==n&&"toJSON"!==n&&(t[n]=Math.max(e[n]-e.navigationStart,0));return t}();if(n.value=n.delta=t.responseStart,n.value<0||n.value>performance.now())return;n.entries=[t],e(n)}catch(e){}},"complete"===document.readyState?setTimeout(t,0):addEventListener("pageshow",t)};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiODIxMzEuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSw0QkFBNEIsT0FBTyxzSUFBc0ksaUJBQWlCLElBQUksd0RBQXdELGdFQUFnRSwyQ0FBMkMsNkJBQTZCLEdBQUcsa0JBQWtCLG1CQUFtQixLQUFLLFdBQVcsaUJBQWlCLG9CQUFvQix5SkFBeUosNEVBQTRFLGVBQWUseUNBQXlDLGtCQUFrQixNQUFNLG1CQUFtQixNQUFNLG1CQUFtQixzRkFBc0YsbUJBQW1CLGdEQUFnRCxjQUFjLGVBQWUsa0JBQWtCLElBQUksTUFBTSxjQUFjLHFDQUFxQyx1QkFBdUIsVUFBVSxLQUFLLEtBQUssc0JBQXNCLFdBQVcsaUJBQWlCLHFDQUFxQyxvSUFBb0kscUlBQXFJLDJDQUEyQyx3REFBd0Qsa0NBQWtDLDRDQUE0QyxHQUFHLEdBQUcsSUFBSSwyQkFBMkIsbUJBQW1CLFVBQVUsU0FBUyxvQkFBb0IsV0FBVyxxQ0FBcUMsc0JBQXNCLDJCQUEyQiw2SUFBNkksdUJBQXVCLDZCQUE2Qiw2QkFBNkIsaUJBQWlCLGlDQUFpQyxJQUFJLElBQUksc0JBQXNCLDRCQUE0QixtREFBbUQsY0FBYyxnQkFBZ0IsT0FBTyxpSUFBaUksdUJBQXVCLEtBQUssU0FBUyxlQUFlLGlCQUFpQixnRUFBZ0Usb0NBQW9DLGlCQUFpQixXQUFXLGNBQWMsSUFBSSxjQUFjLCtFQUErRSx3RUFBd0UsY0FBYyxlQUFlLHdFQUF3RSxnQkFBZ0IsR0FBRyxpQkFBaUIscUNBQXFDLCtGQUErRixzQkFBc0IsNEJBQTRCLHNDQUFzQyx1QkFBdUIsTUFBTSw2RUFBNkUsR0FBRyxLQUFLLGlCQUFpQixxQ0FBcUMsa0JBQWtCLHVEQUF1RCxtQ0FBbUMsTUFBTSxXQUFXLGlCQUFpQixtRUFBbUUseUNBQXlDLHNCQUFzQixtQkFBbUIsRUFBRSwwQkFBMEIsd0RBQXdELGtDQUFrQyx1REFBdUQsR0FBRyxHQUFHLElBQUksZUFBZSxrQkFBa0IsYUFBYSxJQUFJLGdFQUFnRSw0QkFBNEIsb0NBQW9DLDhGQUE4RixTQUFTLEdBQUcsK0VBQStFLG1CQUFtQixXQUFXLGtGQUF1SiIsInNvdXJjZXMiOlsid2VicGFjazovL2NvbGxhYi1ub3Rlcy8uL25vZGVfbW9kdWxlcy93ZWItdml0YWxzL2Rpc3Qvd2ViLXZpdGFscy5qcz8zOGQzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBlLHQsbixpLHI9ZnVuY3Rpb24oZSx0KXtyZXR1cm57bmFtZTplLHZhbHVlOnZvaWQgMD09PXQ/LTE6dCxkZWx0YTowLGVudHJpZXM6W10saWQ6XCJ2Mi1cIi5jb25jYXQoRGF0ZS5ub3coKSxcIi1cIikuY29uY2F0KE1hdGguZmxvb3IoODk5OTk5OTk5OTk5OSpNYXRoLnJhbmRvbSgpKSsxZTEyKX19LGE9ZnVuY3Rpb24oZSx0KXt0cnl7aWYoUGVyZm9ybWFuY2VPYnNlcnZlci5zdXBwb3J0ZWRFbnRyeVR5cGVzLmluY2x1ZGVzKGUpKXtpZihcImZpcnN0LWlucHV0XCI9PT1lJiYhKFwiUGVyZm9ybWFuY2VFdmVudFRpbWluZ1wiaW4gc2VsZikpcmV0dXJuO3ZhciBuPW5ldyBQZXJmb3JtYW5jZU9ic2VydmVyKChmdW5jdGlvbihlKXtyZXR1cm4gZS5nZXRFbnRyaWVzKCkubWFwKHQpfSkpO3JldHVybiBuLm9ic2VydmUoe3R5cGU6ZSxidWZmZXJlZDohMH0pLG59fWNhdGNoKGUpe319LG89ZnVuY3Rpb24oZSx0KXt2YXIgbj1mdW5jdGlvbiBuKGkpe1wicGFnZWhpZGVcIiE9PWkudHlwZSYmXCJoaWRkZW5cIiE9PWRvY3VtZW50LnZpc2liaWxpdHlTdGF0ZXx8KGUoaSksdCYmKHJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ2aXNpYmlsaXR5Y2hhbmdlXCIsbiwhMCkscmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBhZ2VoaWRlXCIsbiwhMCkpKX07YWRkRXZlbnRMaXN0ZW5lcihcInZpc2liaWxpdHljaGFuZ2VcIixuLCEwKSxhZGRFdmVudExpc3RlbmVyKFwicGFnZWhpZGVcIixuLCEwKX0sYz1mdW5jdGlvbihlKXthZGRFdmVudExpc3RlbmVyKFwicGFnZXNob3dcIiwoZnVuY3Rpb24odCl7dC5wZXJzaXN0ZWQmJmUodCl9KSwhMCl9LHU9ZnVuY3Rpb24oZSx0LG4pe3ZhciBpO3JldHVybiBmdW5jdGlvbihyKXt0LnZhbHVlPj0wJiYocnx8bikmJih0LmRlbHRhPXQudmFsdWUtKGl8fDApLCh0LmRlbHRhfHx2b2lkIDA9PT1pKSYmKGk9dC52YWx1ZSxlKHQpKSl9fSxmPS0xLHM9ZnVuY3Rpb24oKXtyZXR1cm5cImhpZGRlblwiPT09ZG9jdW1lbnQudmlzaWJpbGl0eVN0YXRlPzA6MS8wfSxtPWZ1bmN0aW9uKCl7bygoZnVuY3Rpb24oZSl7dmFyIHQ9ZS50aW1lU3RhbXA7Zj10fSksITApfSx2PWZ1bmN0aW9uKCl7cmV0dXJuIGY8MCYmKGY9cygpLG0oKSxjKChmdW5jdGlvbigpe3NldFRpbWVvdXQoKGZ1bmN0aW9uKCl7Zj1zKCksbSgpfSksMCl9KSkpLHtnZXQgZmlyc3RIaWRkZW5UaW1lKCl7cmV0dXJuIGZ9fX0scD1mdW5jdGlvbihlLHQpe3ZhciBuLGk9digpLG89cihcIkZDUFwiKSxmPWZ1bmN0aW9uKGUpe1wiZmlyc3QtY29udGVudGZ1bC1wYWludFwiPT09ZS5uYW1lJiYobSYmbS5kaXNjb25uZWN0KCksZS5zdGFydFRpbWU8aS5maXJzdEhpZGRlblRpbWUmJihvLnZhbHVlPWUuc3RhcnRUaW1lLG8uZW50cmllcy5wdXNoKGUpLG4oITApKSl9LHM9d2luZG93LnBlcmZvcm1hbmNlJiZwZXJmb3JtYW5jZS5nZXRFbnRyaWVzQnlOYW1lJiZwZXJmb3JtYW5jZS5nZXRFbnRyaWVzQnlOYW1lKFwiZmlyc3QtY29udGVudGZ1bC1wYWludFwiKVswXSxtPXM/bnVsbDphKFwicGFpbnRcIixmKTsoc3x8bSkmJihuPXUoZSxvLHQpLHMmJmYocyksYygoZnVuY3Rpb24oaSl7bz1yKFwiRkNQXCIpLG49dShlLG8sdCkscmVxdWVzdEFuaW1hdGlvbkZyYW1lKChmdW5jdGlvbigpe3JlcXVlc3RBbmltYXRpb25GcmFtZSgoZnVuY3Rpb24oKXtvLnZhbHVlPXBlcmZvcm1hbmNlLm5vdygpLWkudGltZVN0YW1wLG4oITApfSkpfSkpfSkpKX0sZD0hMSxsPS0xLGg9ZnVuY3Rpb24oZSx0KXtkfHwocCgoZnVuY3Rpb24oZSl7bD1lLnZhbHVlfSkpLGQ9ITApO3ZhciBuLGk9ZnVuY3Rpb24odCl7bD4tMSYmZSh0KX0sZj1yKFwiQ0xTXCIsMCkscz0wLG09W10sdj1mdW5jdGlvbihlKXtpZighZS5oYWRSZWNlbnRJbnB1dCl7dmFyIHQ9bVswXSxpPW1bbS5sZW5ndGgtMV07cyYmZS5zdGFydFRpbWUtaS5zdGFydFRpbWU8MWUzJiZlLnN0YXJ0VGltZS10LnN0YXJ0VGltZTw1ZTM/KHMrPWUudmFsdWUsbS5wdXNoKGUpKToocz1lLnZhbHVlLG09W2VdKSxzPmYudmFsdWUmJihmLnZhbHVlPXMsZi5lbnRyaWVzPW0sbigpKX19LGg9YShcImxheW91dC1zaGlmdFwiLHYpO2gmJihuPXUoaSxmLHQpLG8oKGZ1bmN0aW9uKCl7aC50YWtlUmVjb3JkcygpLm1hcCh2KSxuKCEwKX0pKSxjKChmdW5jdGlvbigpe3M9MCxsPS0xLGY9cihcIkNMU1wiLDApLG49dShpLGYsdCl9KSkpfSxnPXtwYXNzaXZlOiEwLGNhcHR1cmU6ITB9LHk9bmV3IERhdGUsVD1mdW5jdGlvbihpLHIpe2V8fChlPXIsdD1pLG49bmV3IERhdGUsUyhyZW1vdmVFdmVudExpc3RlbmVyKSxFKCkpfSxFPWZ1bmN0aW9uKCl7aWYodD49MCYmdDxuLXkpe3ZhciByPXtlbnRyeVR5cGU6XCJmaXJzdC1pbnB1dFwiLG5hbWU6ZS50eXBlLHRhcmdldDplLnRhcmdldCxjYW5jZWxhYmxlOmUuY2FuY2VsYWJsZSxzdGFydFRpbWU6ZS50aW1lU3RhbXAscHJvY2Vzc2luZ1N0YXJ0OmUudGltZVN0YW1wK3R9O2kuZm9yRWFjaCgoZnVuY3Rpb24oZSl7ZShyKX0pKSxpPVtdfX0sdz1mdW5jdGlvbihlKXtpZihlLmNhbmNlbGFibGUpe3ZhciB0PShlLnRpbWVTdGFtcD4xZTEyP25ldyBEYXRlOnBlcmZvcm1hbmNlLm5vdygpKS1lLnRpbWVTdGFtcDtcInBvaW50ZXJkb3duXCI9PWUudHlwZT9mdW5jdGlvbihlLHQpe3ZhciBuPWZ1bmN0aW9uKCl7VChlLHQpLHIoKX0saT1mdW5jdGlvbigpe3IoKX0scj1mdW5jdGlvbigpe3JlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb2ludGVydXBcIixuLGcpLHJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb2ludGVyY2FuY2VsXCIsaSxnKX07YWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJ1cFwiLG4sZyksYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJjYW5jZWxcIixpLGcpfSh0LGUpOlQodCxlKX19LFM9ZnVuY3Rpb24oZSl7W1wibW91c2Vkb3duXCIsXCJrZXlkb3duXCIsXCJ0b3VjaHN0YXJ0XCIsXCJwb2ludGVyZG93blwiXS5mb3JFYWNoKChmdW5jdGlvbih0KXtyZXR1cm4gZSh0LHcsZyl9KSl9LEw9ZnVuY3Rpb24obixmKXt2YXIgcyxtPXYoKSxwPXIoXCJGSURcIiksZD1mdW5jdGlvbihlKXtlLnN0YXJ0VGltZTxtLmZpcnN0SGlkZGVuVGltZSYmKHAudmFsdWU9ZS5wcm9jZXNzaW5nU3RhcnQtZS5zdGFydFRpbWUscC5lbnRyaWVzLnB1c2goZSkscyghMCkpfSxsPWEoXCJmaXJzdC1pbnB1dFwiLGQpO3M9dShuLHAsZiksbCYmbygoZnVuY3Rpb24oKXtsLnRha2VSZWNvcmRzKCkubWFwKGQpLGwuZGlzY29ubmVjdCgpfSksITApLGwmJmMoKGZ1bmN0aW9uKCl7dmFyIGE7cD1yKFwiRklEXCIpLHM9dShuLHAsZiksaT1bXSx0PS0xLGU9bnVsbCxTKGFkZEV2ZW50TGlzdGVuZXIpLGE9ZCxpLnB1c2goYSksRSgpfSkpfSxiPXt9LEY9ZnVuY3Rpb24oZSx0KXt2YXIgbixpPXYoKSxmPXIoXCJMQ1BcIikscz1mdW5jdGlvbihlKXt2YXIgdD1lLnN0YXJ0VGltZTt0PGkuZmlyc3RIaWRkZW5UaW1lJiYoZi52YWx1ZT10LGYuZW50cmllcy5wdXNoKGUpLG4oKSl9LG09YShcImxhcmdlc3QtY29udGVudGZ1bC1wYWludFwiLHMpO2lmKG0pe249dShlLGYsdCk7dmFyIHA9ZnVuY3Rpb24oKXtiW2YuaWRdfHwobS50YWtlUmVjb3JkcygpLm1hcChzKSxtLmRpc2Nvbm5lY3QoKSxiW2YuaWRdPSEwLG4oITApKX07W1wia2V5ZG93blwiLFwiY2xpY2tcIl0uZm9yRWFjaCgoZnVuY3Rpb24oZSl7YWRkRXZlbnRMaXN0ZW5lcihlLHAse29uY2U6ITAsY2FwdHVyZTohMH0pfSkpLG8ocCwhMCksYygoZnVuY3Rpb24oaSl7Zj1yKFwiTENQXCIpLG49dShlLGYsdCkscmVxdWVzdEFuaW1hdGlvbkZyYW1lKChmdW5jdGlvbigpe3JlcXVlc3RBbmltYXRpb25GcmFtZSgoZnVuY3Rpb24oKXtmLnZhbHVlPXBlcmZvcm1hbmNlLm5vdygpLWkudGltZVN0YW1wLGJbZi5pZF09ITAsbighMCl9KSl9KSl9KSl9fSxQPWZ1bmN0aW9uKGUpe3ZhciB0LG49cihcIlRURkJcIik7dD1mdW5jdGlvbigpe3RyeXt2YXIgdD1wZXJmb3JtYW5jZS5nZXRFbnRyaWVzQnlUeXBlKFwibmF2aWdhdGlvblwiKVswXXx8ZnVuY3Rpb24oKXt2YXIgZT1wZXJmb3JtYW5jZS50aW1pbmcsdD17ZW50cnlUeXBlOlwibmF2aWdhdGlvblwiLHN0YXJ0VGltZTowfTtmb3IodmFyIG4gaW4gZSlcIm5hdmlnYXRpb25TdGFydFwiIT09biYmXCJ0b0pTT05cIiE9PW4mJih0W25dPU1hdGgubWF4KGVbbl0tZS5uYXZpZ2F0aW9uU3RhcnQsMCkpO3JldHVybiB0fSgpO2lmKG4udmFsdWU9bi5kZWx0YT10LnJlc3BvbnNlU3RhcnQsbi52YWx1ZTwwfHxuLnZhbHVlPnBlcmZvcm1hbmNlLm5vdygpKXJldHVybjtuLmVudHJpZXM9W3RdLGUobil9Y2F0Y2goZSl7fX0sXCJjb21wbGV0ZVwiPT09ZG9jdW1lbnQucmVhZHlTdGF0ZT9zZXRUaW1lb3V0KHQsMCk6YWRkRXZlbnRMaXN0ZW5lcihcInBhZ2VzaG93XCIsdCl9O2V4cG9ydHtoIGFzIGdldENMUyxwIGFzIGdldEZDUCxMIGFzIGdldEZJRCxGIGFzIGdldExDUCxQIGFzIGdldFRURkJ9O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///82131\n')}}]);