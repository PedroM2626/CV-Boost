import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Construction, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface PlaceholderPageProps {
  title: string;
  description: string;
  comingSoon?: boolean;
}

export default function PlaceholderPage({
  title,
  description,
  comingSoon = true,
}: PlaceholderPageProps) {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Card className="text-center">
          <CardContent className="py-16">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Construction className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
              {title}
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              {description}
            </CardDescription>

            {comingSoon && (
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-8 max-w-md mx-auto">
                <h3 className="font-semibold text-primary mb-2">
                  Coming Soon!
                </h3>
                <p className="text-sm text-gray-600">
                  This feature is under development. Continue using our chat to
                  request this page to be built out with full functionality.
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/builder">Try Resume Builder</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
