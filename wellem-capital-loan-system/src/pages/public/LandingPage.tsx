import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  ArrowRight, 
  Shield, 
  Clock, 
  DollarSign,
  Users,
  TrendingUp,
  FileText
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: 'Competitive Rates',
      description: 'Get the best interest rates for your business loans with our transparent pricing.'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Fast Approval',
      description: 'Quick decision process with most applications approved within 24-48 hours.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure Process',
      description: 'Bank-level security ensuring your business data and documents are protected.'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Digital Documentation',
      description: 'Upload and manage all required documents digitally with our secure platform.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Expert Support',
      description: 'Dedicated loan specialists to guide you through the entire process.'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Flexible Terms',
      description: 'Choose from various repayment terms that fit your business cash flow.'
    }
  ];

  const benefits = [
    'Loan amounts from $10,000 to $2,000,000',
    'Terms from 6 months to 7 years',
    'No prepayment penalties',
    'Quick decision and funding',
    'Dedicated account manager',
    'Online account management'
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: 'Johnson Manufacturing',
      text: 'Wellem Capital helped us secure a $500K loan to expand our production facility. The process was smooth and professional.',
      amount: '$500,000'
    },
    {
      name: 'Mike Chen',
      company: 'TechStart Solutions',
      text: 'Quick approval and funding allowed us to take advantage of a major contract opportunity. Excellent service!',
      amount: '$250,000'
    },
    {
      name: 'Lisa Rodriguez',
      company: 'Rodriguez Consulting',
      text: 'Professional service and competitive rates. The entire team was helpful throughout the process.',
      amount: '$150,000'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-neutral-50 to-primary-50 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-7 lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl md:text-6xl">
                <span className="block">Business Loans</span>
                <span className="block text-primary-800">Made Simple</span>
              </h1>
              <p className="mt-6 text-lg text-neutral-600 sm:text-xl">
                Empower your business growth with fast, secure, and flexible loan solutions. 
                From startups to established enterprises, we provide the capital you need to succeed.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/register" className="flex-1">
                    <Button fullWidth size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                      Register Your Business
                    </Button>
                  </Link>
                  <Link to="/login" className="flex-1">
                    <Button variant="secondary" fullWidth size="lg">
                      Borrower Login
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-5 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-lg shadow-2xl lg:max-w-md">
                <div className="relative block w-full rounded-lg bg-white overflow-hidden">
                  <img
                    className="w-full h-64 sm:h-80 object-cover"
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f1f5f9'/%3E%3Ctext x='200' y='140' font-family='Arial' font-size='18' text-anchor='middle' fill='%2364748b'%3EBusiness Growth%3C/text%3E%3Ctext x='200' y='170' font-family='Arial' font-size='14' text-anchor='middle' fill='%2394a3b8'%3EWith Wellem Capital%3C/text%3E%3C/svg%3E"
                    alt="Business Growth"
                  />
                  <div className="absolute inset-0 bg-primary-900 bg-opacity-10"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Everything you need for business financing
            </p>
            <p className="mt-4 max-w-2xl text-xl text-neutral-500 lg:mx-auto">
              Our comprehensive loan management system provides a seamless experience for businesses seeking funding.
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <Card key={index} className="text-center">
                  <div className="flex justify-center">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <div className="mt-5">
                    <h3 className="text-lg font-medium text-neutral-900">{feature.title}</h3>
                    <p className="mt-2 text-base text-neutral-500">{feature.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">
                Why Choose Wellem Capital
              </h2>
              <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-neutral-900 sm:text-4xl">
                Built for business success
              </p>
              <p className="mt-4 text-lg text-neutral-500">
                We understand the unique challenges businesses face when seeking financing. 
                Our platform is designed to make the process as smooth and efficient as possible.
              </p>
              <div className="mt-8">
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="flex-shrink-0 h-5 w-5 text-success-500 mt-1" />
                      <span className="ml-3 text-base text-neutral-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-lg shadow-xl">
                <Card className="p-8">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-6">Ready to Get Started?</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Loan Amount:</span>
                      <span className="font-medium text-neutral-900">$10K - $2M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Approval Time:</span>
                      <span className="font-medium text-neutral-900">24-48 Hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Interest Rate:</span>
                      <span className="font-medium text-neutral-900">Starting at 5.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Term Length:</span>
                      <span className="font-medium text-neutral-900">6 Months - 7 Years</span>
                    </div>
                  </div>
                  <div className="mt-8">
                    <Link to="/register">
                      <Button fullWidth size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                        Apply Now
                      </Button>
                    </Link>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">
              Success Stories
            </h2>
            <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-neutral-900 sm:text-4xl">
              What our clients say
            </p>
          </div>
          <div className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-medium text-neutral-900">{testimonial.name}</h4>
                    <p className="text-sm text-neutral-500">{testimonial.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-success-600">{testimonial.amount}</p>
                    <p className="text-xs text-neutral-500">Loan Amount</p>
                  </div>
                </div>
                <blockquote className="text-neutral-600 italic">
                  "{testimonial.text}"
                </blockquote>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-800">
        <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to grow your business?</span>
            <span className="block text-primary-200">Start your application today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link to="/register">
                <Button variant="secondary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                  Get Started
                </Button>
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link to="/login">
                <Button variant="ghost" size="lg" className="text-white border-white hover:bg-white hover:text-primary-800">
                  Existing User
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;