import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AddClassNews from './AddClassNews';
import DashbaordDateDisplay from '../DateDisplay';

interface Props {
  news: {
    id: number;
    title: string;
    updated_at: Date;
  }[];
  classes: {
    id: number;
    name: string;
  }[];
}
const TeacherDashboardNews: React.FC<Props> = ({ news, classes }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>News</CardTitle>
      </CardHeader>
      <CardContent>
        {news.map((nws, i) => {
          return (
            <div
              key={`news-${i}`}
              className="flex flex-row gap-2 items-center justify-between hover:bg-secondary p-2"
            >
              <span className="">{nws.title}</span>
              <DashbaordDateDisplay date={nws.updated_at} />
            </div>
          );
        })}
        <AddClassNews classes={classes} />
      </CardContent>
    </Card>
  );
};

export default TeacherDashboardNews;
