import 'package:flutter/material.dart';

class HealthDataScreen extends StatelessWidget {
  // Dữ liệu mẫu từ backend
  final List<Map<String, dynamic>> healthData = [
    {
      "_id": "672b2dd37553c70bc61fd123",
      "Day": "2024-11-06",
      "BODYINDEX": {"Weigh": 70, "BMI": 23.5, "Height": 170},
      "SLEEP": {"sleepTime": 4, "Start": "22:00", "End": "06:00"},
    },
    {
      "_id": "672b2e5c7553c70bc61fd128",
      "Day": "2024-11-03",
      "BODYINDEX": {"Weigh": 50, "BMI": 22.5, "Height": 170},
      "SLEEP": {"sleepTime": 8, "Start": "00:00", "End": "00:00"},
    },
    {
      "_id": "672b3185aa3402f7c4aa0db0",
      "Day": "2024-11-06",
      "BODYINDEX": {},
      "SLEEP": {"sleepTime": 0, "Start": "09:06", "End": "09:06"},
    },
    {
      "_id": "672b3782f35d2c50144af86c",
      "Day": "2024-11-06",
      "BODYINDEX": {},
      "SLEEP": {"sleepTime": 7, "Start": "22:00", "End": "05:00"},
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Dữ liệu sức khỏe'),
      ),
      body: ListView.builder(
        itemCount: healthData.length,
        itemBuilder: (context, index) {
          final item = healthData[index];
          final bodyIndex = item['BODYINDEX'] ?? {};
          final sleep = item['SLEEP'] ?? {};

          return Card(
            margin: EdgeInsets.all(8.0),
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Ngày: ${item["Day"]}',
                    style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
                  ),
                  SizedBox(height: 8.0),
                  if (bodyIndex.isNotEmpty) ...[
                    Text('Cân nặng: ${bodyIndex["Weigh"] ?? "N/A"} kg'),
                    Text('BMI: ${bodyIndex["BMI"] ?? "N/A"}'),
                    Text('Chiều cao: ${bodyIndex["Height"] ?? "N/A"} cm'),
                  ] else
                    Text('Không có chỉ số cơ thể.'),
                  SizedBox(height: 8.0),
                  if (sleep.isNotEmpty) ...[
                    Text('Thời gian ngủ: ${sleep["sleepTime"] ?? "N/A"} giờ'),
                    Text('Bắt đầu: ${sleep["Start"] ?? "N/A"}'),
                    Text('Kết thúc: ${sleep["End"] ?? "N/A"}'),
                  ] else
                    Text('Không có thông tin giấc ngủ.'),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
