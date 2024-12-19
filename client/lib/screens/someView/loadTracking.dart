// import 'package:flutter/material.dart';
// import 'health_service.dart';

// class HealthDataScreen extends StatefulWidget {
//   @override
//   _HealthDataScreenState createState() => _HealthDataScreenState();
// }

// class _HealthDataScreenState extends State<HealthDataScreen> {
//   late Future<List<dynamic>> _healthData;

//   @override
//   void initState() {
//     super.initState();
//     _healthData = HealthService().fetchHealthData();
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         title: Text('Dữ liệu sức khỏe'),
//       ),
//       body: FutureBuilder<List<dynamic>>(
//         future: _healthData,
//         builder: (context, snapshot) {
//           if (snapshot.connectionState == ConnectionState.waiting) {
//             return Center(child: CircularProgressIndicator());
//           } else if (snapshot.hasError) {
//             return Center(child: Text('Error: ${snapshot.error}'));
//           } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
//             return Center(child: Text('Không có dữ liệu'));
//           }

//           final data = snapshot.data!;
//           return ListView.builder(
//             itemCount: data.length,
//             itemBuilder: (context, index) {
//               final item = data[index];
//               final bodyIndex = item['BODYINDEX'] ?? {};
//               final sleep = item['SLEEP'] ?? {};

//               return Card(
//                 margin: EdgeInsets.all(8.0),
//                 child: Padding(
//                   padding: const EdgeInsets.all(16.0),
//                   child: Column(
//                     crossAxisAlignment: CrossAxisAlignment.start,
//                     children: [
//                       Text(
//                         'Ngày: ${item["Day"]}',
//                         style: TextStyle(
//                             fontWeight: FontWeight.bold, fontSize: 18),
//                       ),
//                       SizedBox(height: 8.0),
//                       if (bodyIndex.isNotEmpty) ...[
//                         Text('Cân nặng: ${bodyIndex["Weigh"] ?? "N/A"} kg'),
//                         Text('BMI: ${bodyIndex["BMI"] ?? "N/A"}'),
//                         Text('Chiều cao: ${bodyIndex["Height"] ?? "N/A"} cm'),
//                       ] else
//                         Text('Không có chỉ số cơ thể.'),
//                       SizedBox(height: 8.0),
//                       if (sleep.isNotEmpty) ...[
//                         Text(
//                             'Thời gian ngủ: ${sleep["sleepTime"] ?? "N/A"} giờ'),
//                         Text('Bắt đầu: ${sleep["Start"] ?? "N/A"}'),
//                         Text('Kết thúc: ${sleep["End"] ?? "N/A"}'),
//                       ] else
//                         Text('Không có thông tin giấc ngủ.'),
//                     ],
//                   ),
//                 ),
//               );
//             },
//           );
//         },
//       ),
//     );
//   }
// }
