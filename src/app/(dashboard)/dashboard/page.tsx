/* eslint-disable react/no-unescaped-entities */
"use client";

import { useAppSelector } from '@/redux/hooks';
import { selectCurrentUser } from '@/redux/slice/authSlice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from 'lucide-react';

const DashboardHome = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Welcome to Your Dashboard</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
            <CardDescription>Your current information</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={currentUser?.profilePhoto} alt={currentUser?.email} />
              <AvatarFallback>{currentUser?.email?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xl font-semibold">{currentUser?.email}</p>
              <Badge variant="secondary" className="mt-2">{currentUser?.role}</Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Dashboard Status</CardTitle>
            <CardDescription>We're working on something amazing!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center space-x-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-lg font-medium">Under Construction</p>
            </div>
            <p className="mt-4 text-center text-muted-foreground">
              We're crafting an extraordinary dashboard experience just for you. 
              Stay tuned for exciting features and insights coming your way soon!
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">What's Next?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          I am working tirelessly to bring you cutting-edge features and 
          data visualizations. In the meantime, feel free to explore the available 
          sections and get familiar with the interface. Your patience will be rewarded 
          with an unparalleled dashboard experience!
        </p>
      </div>
      
      <div className="mt-12 flex justify-center">
        <svg
          className="w-64 h-64 text-primary animate-float"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={0.5}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      </div>
    </div>
  );
}

export default DashboardHome;
