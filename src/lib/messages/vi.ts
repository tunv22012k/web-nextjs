export const messages = {
  auth: {
    login: {
      success: "Đăng nhập thành công",
      error: "Đăng nhập thất bại",
      invalid_credentials: "Email hoặc mật khẩu không hợp lệ",
      server_error: "Không thể kết nối đến máy chủ",
      role: {
        "01": "Đăng nhập người dùng",
        "02": "Đăng nhập nhân viên bán hàng",
        "03": "Đăng nhập quản trị viên",
      },
    },
    register: {
      success: "Đăng ký thành công",
      error: "Đăng ký thất bại",
      email_exists: "Email đã tồn tại",
      server_error: "Không thể kết nối đến máy chủ",
      role: {
        "01": "Đăng ký người dùng mới",
        "02": "Đăng ký nhân viên bán hàng",
      },
    },
    validation: {
      email: {
        required: "Email là bắt buộc",
        invalid: "Email không hợp lệ",
      },
      password: {
        required: "Mật khẩu là bắt buộc",
        min: "Mật khẩu phải có ít nhất 8 ký tự",
        pattern: "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số",
        confirm: "Mật khẩu xác nhận không khớp",
      },
      name: {
        required: "Họ tên là bắt buộc",
        min: "Họ tên phải có ít nhất 2 ký tự",
        max: "Họ tên không được quá 50 ký tự",
      },
      phone: {
        pattern: "Số điện thoại không hợp lệ",
      },
      role: {
        required: "Vai trò là bắt buộc",
        invalid: "Vai trò không hợp lệ",
      },
    },
  },
  http: {
    status: {
      200: "Thành công",
      201: "Đã tạo thành công",
      400: "Yêu cầu không hợp lệ",
      401: "Chưa xác thực",
      403: "Không có quyền truy cập",
      404: "Không tìm thấy",
      500: "Lỗi máy chủ",
    },
  },
  common: {
    loading: "Đang tải...",
    processing: "Đang xử lý...",
    error: "Có lỗi xảy ra",
    success: "Thành công",
    confirm: "Xác nhận",
    cancel: "Hủy",
  },
}; 