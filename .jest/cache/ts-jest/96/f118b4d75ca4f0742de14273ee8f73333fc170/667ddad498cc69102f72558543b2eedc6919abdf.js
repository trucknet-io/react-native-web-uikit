"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var App_1 = __importDefault(require("../App"));
var react_test_renderer_1 = __importDefault(require("react-test-renderer"));
test('renders correctly', function () {
    var tree = react_test_renderer_1.default.create(react_1.default.createElement(App_1.default, null)).toJSON();
    expect(tree).toMatchSnapshot();
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL2RzZW1lbm55dWsvZGV2L0Fycm93L19fdGVzdHNfXy9BcHAudHN4IiwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0RBQTBCO0FBQzFCLCtDQUF5QjtBQUN6Qiw0RUFBMkM7QUFFM0MsSUFBSSxDQUFDLG1CQUFtQixFQUFFO0lBQ3hCLElBQU0sSUFBSSxHQUFHLDZCQUFRLENBQUMsTUFBTSxDQUFDLDhCQUFDLGFBQUcsT0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDL0MsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO0FBQ2pDLENBQUMsQ0FBQyxDQUFDIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi9Vc2Vycy9kc2VtZW5ueXVrL2Rldi9BcnJvdy9fX3Rlc3RzX18vQXBwLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEFwcCBmcm9tICcuLi9BcHAnO1xuaW1wb3J0IHJlbmRlcmVyIGZyb20gJ3JlYWN0LXRlc3QtcmVuZGVyZXInO1xuXG50ZXN0KCdyZW5kZXJzIGNvcnJlY3RseScsICgpID0+IHtcbiAgY29uc3QgdHJlZSA9IHJlbmRlcmVyLmNyZWF0ZSg8QXBwIC8+KS50b0pTT04oKTtcbiAgZXhwZWN0KHRyZWUpLnRvTWF0Y2hTbmFwc2hvdCgpO1xufSk7Il0sInZlcnNpb24iOjN9