"use strict";
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var instructions = react_native_1.Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        return (react_1.default.createElement(react_native_1.View, { style: styles.container },
            react_1.default.createElement(react_native_1.Text, { style: styles.welcome }, "Welcome to React Native!"),
            react_1.default.createElement(react_native_1.Text, { style: styles.instructions }, "To get started, edit App.js"),
            react_1.default.createElement(react_native_1.Text, { style: styles.instructions }, instructions)));
    };
    return App;
}(react_1.Component));
exports.default = App;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL2RzZW1lbm55dWsvZGV2L0Fycm93L0FwcC50c3giLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVILDZDQUF1QztBQUN2Qyw2Q0FBOEQ7QUFFOUQsSUFBTSxZQUFZLEdBQUcsdUJBQVEsQ0FBQyxNQUFNLENBQUM7SUFDbkMsR0FBRyxFQUFFLDBCQUEwQixHQUFHLDZCQUE2QjtJQUMvRCxPQUFPLEVBQ0wsNENBQTRDO1FBQzVDLHlDQUF5QztDQUM1QyxDQUFDLENBQUM7QUFHSDtJQUFpQyx1QkFBZ0I7SUFBakQ7O0lBVUEsQ0FBQztJQVRDLG9CQUFNLEdBQU47UUFDRSxPQUFPLENBQ0wsOEJBQUMsbUJBQUksSUFBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLFNBQVM7WUFDM0IsOEJBQUMsbUJBQUksSUFBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLE9BQU8sK0JBQWlDO1lBQzVELDhCQUFDLG1CQUFJLElBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxZQUFZLGtDQUFvQztZQUNwRSw4QkFBQyxtQkFBSSxJQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsWUFBWSxJQUFHLFlBQVksQ0FBUSxDQUNsRCxDQUNSLENBQUM7SUFDSixDQUFDO0lBQ0gsVUFBQztBQUFELENBQUMsQUFWRCxDQUFpQyxpQkFBUyxHQVV6Qzs7QUFFRCxJQUFNLE1BQU0sR0FBRyx5QkFBVSxDQUFDLE1BQU0sQ0FBQztJQUMvQixTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUsQ0FBQztRQUNQLGNBQWMsRUFBRSxRQUFRO1FBQ3hCLFVBQVUsRUFBRSxRQUFRO1FBQ3BCLGVBQWUsRUFBRSxTQUFTO0tBQzNCO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsUUFBUSxFQUFFLEVBQUU7UUFDWixTQUFTLEVBQUUsUUFBUTtRQUNuQixNQUFNLEVBQUUsRUFBRTtLQUNYO0lBQ0QsWUFBWSxFQUFFO1FBQ1osU0FBUyxFQUFFLFFBQVE7UUFDbkIsS0FBSyxFQUFFLFNBQVM7UUFDaEIsWUFBWSxFQUFFLENBQUM7S0FDaEI7Q0FDRixDQUFDLENBQUMiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiL1VzZXJzL2RzZW1lbm55dWsvZGV2L0Fycm93L0FwcC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBTYW1wbGUgUmVhY3QgTmF0aXZlIEFwcFxuICogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0LW5hdGl2ZVxuICpcbiAqIEBmb3JtYXRcbiAqIEBmbG93XG4gKi9cblxuaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1BsYXRmb3JtLCBTdHlsZVNoZWV0LCBUZXh0LCBWaWV3fSBmcm9tICdyZWFjdC1uYXRpdmUnO1xuXG5jb25zdCBpbnN0cnVjdGlvbnMgPSBQbGF0Zm9ybS5zZWxlY3Qoe1xuICBpb3M6ICdQcmVzcyBDbWQrUiB0byByZWxvYWQsXFxuJyArICdDbWQrRCBvciBzaGFrZSBmb3IgZGV2IG1lbnUnLFxuICBhbmRyb2lkOlxuICAgICdEb3VibGUgdGFwIFIgb24geW91ciBrZXlib2FyZCB0byByZWxvYWQsXFxuJyArXG4gICAgJ1NoYWtlIG9yIHByZXNzIG1lbnUgYnV0dG9uIGZvciBkZXYgbWVudScsXG59KTtcblxudHlwZSBQcm9wcyA9IHt9O1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIGV4dGVuZHMgQ29tcG9uZW50PFByb3BzPiB7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPFZpZXcgc3R5bGU9e3N0eWxlcy5jb250YWluZXJ9PlxuICAgICAgICA8VGV4dCBzdHlsZT17c3R5bGVzLndlbGNvbWV9PldlbGNvbWUgdG8gUmVhY3QgTmF0aXZlITwvVGV4dD5cbiAgICAgICAgPFRleHQgc3R5bGU9e3N0eWxlcy5pbnN0cnVjdGlvbnN9PlRvIGdldCBzdGFydGVkLCBlZGl0IEFwcC5qczwvVGV4dD5cbiAgICAgICAgPFRleHQgc3R5bGU9e3N0eWxlcy5pbnN0cnVjdGlvbnN9PntpbnN0cnVjdGlvbnN9PC9UZXh0PlxuICAgICAgPC9WaWV3PlxuICAgICk7XG4gIH1cbn1cblxuY29uc3Qgc3R5bGVzID0gU3R5bGVTaGVldC5jcmVhdGUoe1xuICBjb250YWluZXI6IHtcbiAgICBmbGV4OiAxLFxuICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjRjVGQ0ZGJyxcbiAgfSxcbiAgd2VsY29tZToge1xuICAgIGZvbnRTaXplOiAyMCxcbiAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgIG1hcmdpbjogMTAsXG4gIH0sXG4gIGluc3RydWN0aW9uczoge1xuICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgY29sb3I6ICcjMzMzMzMzJyxcbiAgICBtYXJnaW5Cb3R0b206IDUsXG4gIH0sXG59KTtcbiJdLCJ2ZXJzaW9uIjozfQ==