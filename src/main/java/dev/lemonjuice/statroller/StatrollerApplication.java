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
	private static int port;

	/**
	 * The main method for the Statroller application.
	 * Runs the Spring Boot application.
	 *
	 * @param args
	 */
	public static void main(String[] args) {
		context = SpringApplication.run(StatrollerApplication.class, args);
		shutdown();
	}

	/**
	 * Sets the port variable to the port the application is running on.
	 *
	 * @param event the event that the application is running
	 */
	@Override
	public void onApplicationEvent(WebServerInitializedEvent event) {
		port = event.getWebServer().getPort();
	}

	/**
	 * Opens the default web browser to the index page of the application.
	 * Then shuts down the Spring Boot application after a delay.
	 */
	public static void shutdown() {
		if (context != null) {
			openBrowser("http://localhost:" + port + "/index.html");
			try {
				Thread.sleep(10000);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			SpringApplication.exit(context, () -> 0);
		}
	}

	/**
	 * Opens the default web browser to the specified URL.
	 * To do this, the method determines the operating system and uses the appropriate command to open the browser.
	 *
	 * @param url the URL to open in the browser
	 */
	private static void openBrowser(String url) {
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
}