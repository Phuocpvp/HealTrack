import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Health Tracker',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: HomeScreen(),
    );
  }
}

class HomeScreen extends StatelessWidget {
  // final ApiService _apiService = ApiService('${dotenv.env['LOCALHOST']}');
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Health Tracker'),
        actions: [
          IconButton(
            icon: Icon(Icons.account_circle),
            onPressed: () {
              // Điều hướng tới trang hồ sơ cá nhân
              Navigator.pushNamed(context, '/profile');
            },
          ),
          IconButton(
            icon: Icon(Icons.logout),
            onPressed: () {
              // Điều hướng tới trang hồ sơ cá nhân
              Navigator.pushNamed(context, '/testdata');
            },
          ),
        ],
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Tổng quan sức khỏe',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 16),
            Card(
              child: ListTile(
                title: Text('Bước chân hôm nay'),
                subtitle: Text('10,000 bước'),
                trailing: Icon(Icons.directions_walk),
              ),
            ),
            Card(
              child: ListTile(
                title: Text('Nhịp tim'),
                subtitle: Text('75 bpm'),
                trailing: Icon(Icons.favorite),
              ),
            ),
            Card(
              child: ListTile(
                title: Text('Calories đã đốt cháy'),
                subtitle: Text('300 kcal'),
                trailing: Icon(Icons.local_fire_department),
              ),
            ),
            Card(
              child: ListTile(
                title: Text('Cân nặng'),
                subtitle: Text('65 kg'),
                trailing: Icon(Icons.scale),
              ),
            ),
            SizedBox(height: 16),
            Text(
              'Biểu đồ sức khỏe',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            // Thêm một biểu đồ ở đây (sử dụng package như fl_chart hoặc syncfusion_flutter_charts)
            Expanded(child: Placeholder()),
            SizedBox(height: 16),
            ElevatedButton(
              onPressed: () {
                // Điều hướng tới trang chi tiết hoặc cài đặt
                Navigator.pushNamed(context, '/entry');
              },
              child: Text('Thiết lập lại mục tiêu'),
            ),
          ],
        ),
      ),
    );
  }
}
