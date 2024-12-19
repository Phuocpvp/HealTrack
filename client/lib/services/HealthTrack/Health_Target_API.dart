import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:client/services/flutter_secure_storage.dart';

class HealthTargetAPI {
  static final tokenService = SecureStorageService();
  static String? token;

  // Hàm gửi dữ liệu mục tiêu sức khỏe lên server
  static Future<bool> createHealthTarget(
    double weightGoal,
    int stepsGoal,
    int sleepHoursGoal,
    String endDate, // Thêm tham số endDate
  ) async {
    // Lấy token từ SecureStorage
    token = await tokenService.getValidAccessToken();
    if (token == null) {
      print('Không tìm thấy token hoặc làm mới token thất bại.');
      return false;
    }

    // Dữ liệu mục tiêu sức khỏe
    final healthTargetData = {
      "weightGoal": weightGoal,
      "stepsGoal": stepsGoal,
      "sleepHoursGoal": sleepHoursGoal,
      "endDate": endDate, // Thêm trường endDate vào dữ liệu gửi đi
    };

    // Gửi yêu cầu API với token
    try {
      final response = await http.post(
        Uri.parse('${dotenv.env['LOCALHOST']}/health-tracking/save'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $token', // Gửi token trong header
        },
        body: jsonEncode(healthTargetData),
      );

      if (response.statusCode == 200 || response.statusCode == 201) {
        return true; // Thành công
      } else {
        print(
            "Không thể tạo mục tiêu sức khỏe. HTTP Status: ${response.statusCode}");
        return false; // Thất bại
      }
    } catch (e) {
      print("Lỗi khi gửi yêu cầu: $e");
      return false;
    }
  }

  // Hàm lấy dữ liệu mục tiêu sức khỏe
  static Future<Map<String, dynamic>?> getHealthGoals() async {
    token = await tokenService.getValidAccessToken();
    if (token == null) {
      print('Không tìm thấy token hoặc làm mới token thất bại.');
      return null;
    }

    try {
      final response = await http.get(
        Uri.parse('${dotenv.env['LOCALHOST']}/health-tracking'),
        headers: {
          'Authorization': 'Bearer $token', // Gửi token trong header
        },
      );

      if (response.statusCode == 200) {
        // Parse dữ liệu nếu thành công
        return jsonDecode(response.body);
      } else {
        print(
            "Lỗi khi lấy dữ liệu mục tiêu sức khỏe. HTTP Status: ${response.statusCode}");
        return null;
      }
    } catch (e) {
      print("Lỗi khi gửi yêu cầu: $e");
      return null;
    }
  }

  static Future<Map<String, dynamic>?> getLatestHealthTrackingData() async {
    // Lấy token hợp lệ từ token service
    String? token = await tokenService.getValidAccessToken();
    if (token == null) {
      print('Không tìm thấy token hoặc làm mới token thất bại.');
      return null;
    }

    try {
      // Gửi yêu cầu GET đến server với Bearer token
      final response = await http.get(
        Uri.parse('${dotenv.env['LOCALHOST']}/health-tracking/latest'),
        headers: {
          'Authorization': 'Bearer $token', // Gửi token trong header
        },
      );

      // Kiểm tra nếu phản hồi thành công (HTTP 200)
      if (response.statusCode == 200) {
        // Parse dữ liệu trả về từ server (một danh sách)
        List<dynamic> responseData = jsonDecode(response.body);

        // Kiểm tra xem dữ liệu có rỗng hay không
        if (responseData.isNotEmpty) {
          // Lấy đối tượng đầu tiên trong danh sách, vì chúng ta chỉ cần một bản ghi
          return responseData[0]; // Trả về đối tượng Map trong danh sách
        } else {
          print("Không có dữ liệu trả về từ server.");
          return null;
        }
      } else {
        // In lỗi nếu có vấn đề
        print(
            "Lỗi khi lấy dữ liệu mục tiêu sức khỏe. HTTP Status: ${response.statusCode}");
        return null;
      }
    } catch (e) {
      // In lỗi nếu có vấn đề trong quá trình gửi yêu cầu
      print("Lỗi khi gửi yêu cầu: $e");
      return null;
    }
  }

  // Hàm cập nhật mục tiêu sức khỏe
  static Future<bool> updateHealthTarget(
    double weightGoal,
    int stepsGoal,
    int sleepHoursGoal,
    String endDate, // Thêm tham số endDate
  ) async {
    token = await tokenService.getValidAccessToken();
    if (token == null) {
      print('Không tìm thấy token hoặc làm mới token thất bại.');
      return false;
    }

    final healthTargetData = {
      "weightGoal": weightGoal,
      "stepsGoal": stepsGoal,
      "sleepHoursGoal": sleepHoursGoal,
      "endDate": endDate, // Thêm trường endDate vào dữ liệu gửi đi
    };

    try {
      final response = await http.put(
        Uri.parse('${dotenv.env['LOCALHOST']}/health-tracking/update'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $token',
        },
        body: jsonEncode(healthTargetData),
      );

      if (response.statusCode == 200) {
        return true; // Thành công
      } else {
        print(
            "Không thể cập nhật mục tiêu sức khỏe. HTTP Status: ${response.statusCode}");
        return false;
      }
    } catch (e) {
      print("Lỗi khi gửi yêu cầu: $e");
      return false;
    }
  }
}
