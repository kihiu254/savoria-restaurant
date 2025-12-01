import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen pt-24 pb-20 px-6">
            <div className="mx-auto max-w-4xl">
                <div className="mb-8">
                    <Link href="/">
                        <Button variant="ghost" className="text-white/60 hover:text-white hover:bg-white/10 -ml-4">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Home
                        </Button>
                    </Link>
                </div>

                <div className="space-y-8">
                    <div className="border-b border-white/10 pb-8">
                        <h1 className="text-4xl font-bold text-white font-heading mb-4">Privacy Policy</h1>
                        <p className="text-white/60">Last updated: {new Date().toLocaleDateString()}</p>
                    </div>

                    <div className="prose prose-invert max-w-none text-white/80 space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">1. Information Collection</h2>
                            <p>
                                We collect information that you provide directly to us, such as when you create an account, make a reservation, order food, subscribe to our newsletter, or contact us for support. This information may include your name, email address, phone number, payment information, and dietary preferences.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">2. Use of Information</h2>
                            <p>
                                We use the information we collect to provide, maintain, and improve our services, such as to:
                            </p>
                            <ul className="list-disc pl-6 mt-4 space-y-2">
                                <li>Process your reservations and orders;</li>
                                <li>Send you technical notices, updates, security alerts, and support messages;</li>
                                <li>Respond to your comments, questions, and requests;</li>
                                <li>Communicate with you about products, services, offers, and events;</li>
                                <li>Monitor and analyze trends, usage, and activities in connection with our services.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">3. Cookies and Tracking</h2>
                            <p>
                                We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
                            <p>
                                The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">5. Third-Party Services</h2>
                            <p>
                                We may employ third party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">6. Contact Us</h2>
                            <p>
                                If you have any questions about this Privacy Policy, please contact us:
                            </p>
                            <ul className="list-disc pl-6 mt-4 space-y-2">
                                <li>By email: privacy@savoria.com</li>
                                <li>By phone: +1 (555) 123-4567</li>
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
