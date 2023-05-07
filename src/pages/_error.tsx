import Link from "next/link"

const ErrorPage = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <h1 className="text-4xl font-bold text-gray-800">
      Lỗi không đủ thẩm quyền
    </h1>
    <p className="text-lg text-gray-700 mt-4">
      Bạn không đủ thẩm quyền để tru cập trang này. Vui long đăng nhập với tài
      khoản quyền cao hơn và tiếp tục
    </p>
    <Link
      href="/"
      className="mt-8 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
    >
      Trở về trang chủ
    </Link>
  </div>
)

export default ErrorPage
