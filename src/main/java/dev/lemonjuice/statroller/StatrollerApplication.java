package dev.lemonjuice.statroller;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.context.WebServerInitializedEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.ConfigurableApplicationContext;

import java.io.IOException;
import java.util.concurrent.CountDownLatch;

/**
 * The main file for the Statroller application using Spring Boot.
 *
 * @author Lemon
 */
@SpringBootApplication
public class StatrollerApplication implements ApplicationListener<WebServerInitializedEvent> {

	private static ConfigurableApplicationContext context;
	private static final CountDownLatch latch = new CountDownLatch(1);

	/**
	 * The main method for the Statroller application, which does two things:
	 *
	 * 1. Runs the Spring Boot application.
	 * 2. Close the application right after it starts.
	 *
	 * Since the application is a web application, it will run indefinitely until closed.
	 *
	 * @param args
	 */
	public static void main(String[] args) {
		// Run the Spring Boot application
		SpringApplication.run(StatrollerApplication.class, args);
	}

	@Override
	public void onApplicationEvent(WebServerInitializedEvent event) {
		int port = event.getWebServer().getPort();
		openBrowser("http://localhost:" + port + "/index.html");
		try {
			latch.await(); // Wait until countdown latch reaches zero
		} catch (InterruptedException e) {
			Thread.currentThread().interrupt();
			e.printStackTrace();
		} finally {
			shutdown(); // Shutdown application after browser is opened
		}
	}

	/**
	 * Opens the default web browser to the specified URL.
	 * To do this, the method determines the operating system and uses the appropriate command to open the browser.
	 *
	 * @param url the URL to open in the browser
	 */
	private void openBrowser(String url) {
		String os = System.getProperty("os.name").toLowerCase();
		Runtime runtime = Runtime.getRuntime();
		try {
			if (os.contains("win")) {
				runtime.exec(new String[]{"cmd", "/c", "start", url});
			} else if (os.contains("mac")) {
				runtime.exec(new String[]{"open", url});
			} else if (os.contains("nix") || os.contains("nux")) {
				runtime.exec(new String[]{"xdg-open", url});
			} else {
				System.err.println("Unsupported operating system: " + os);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * Gracefully shuts down the application.
	 */
	public static void shutdown() {
		if (context != null) {
			context.close();
		}
	}
}