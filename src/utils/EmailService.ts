/**
 * Email service utility for sending contact form messages
 */

interface EmailData {
  name: string;
  email: string;
  message: string;
  subject?: string;
  to_email?: string;
}

/**
 * Sends an email using Web3Forms API
 */
export const sendEmail = async (data: EmailData): Promise<{ success: boolean; message: string }> => {
  try {
    // Get the access key from config
    const accessKey = siteConfig.web3FormsKey;
    
    if (!accessKey || accessKey === "YOUR_WEB3FORMS_ACCESS_KEY") {
      console.warn("⚠️ Web3Forms access key not configured!");
      // In development, you can simulate a successful response
      if (process.env.NODE_ENV === "development") {
        return new Promise(resolve => 
          setTimeout(() => resolve({ success: true, message: "Development mode - Email simulated" }), 1000)
        );
      }
    }
    
    // Prepare the payload
    const payload = {
      access_key: accessKey,
      subject: data.subject || `New contact from ${data.name}`,
      from_name: data.name,
      from_email: data.email,
      message: data.message,
      to_email: data.to_email || "tanish.parsana2004@gmail.com",
    };
    
    // Send the request to Web3Forms API
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
    
    const result = await response.json();
    
    if (result.success) {
      return { success: true, message: "Email sent successfully" };
    } else {
      throw new Error(result.message || "Failed to send email");
    }
  } catch (error) {
    console.error("Email sending error:", error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Unknown error occurred" 
    };
  }
};
