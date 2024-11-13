#[cfg_attr(mobile, tauri::mobile_entry_point)]

use tauri::Manager;
//use raw_window_handle::borrowed::HasWindowHandle;

pub fn run() {
  tauri::Builder::default()
    .setup(|app| {
      let _window = app.get_window("main").unwrap(); // get_webview_window en Tauri v2

      //let raw_handle = window.window_handle();
      //let handle = window.hwnd();

      //std::process::Command::new("mpv")
      //  .args(&[&format!("--wid={}", handle as u64), "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"])
      //  .spawn()
      //  .unwrap();

      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
