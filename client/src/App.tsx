import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import AllContacts from "@/pages/AllContacts";
import Groups from "@/pages/Groups";
import NewGroup from "@/pages/NewGroup";
import Backup from "@/pages/Backup";
import Settings from "@/pages/Settings";
import Layout from "@/components/Layout";
import { ThemeProvider } from "@/components/ui/theme-provider";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/contacts" component={AllContacts} />
        <Route path="/groups" component={Groups} />
        <Route path="/groups/new" component={NewGroup} />
        <Route path="/backup" component={Backup} />
        <Route path="/settings" component={Settings} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="contact-manager-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
