import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ReportService } from 'src/app/services/report.service';
import { TokenService } from 'src/app/services/tokenservice.service';
import { Report } from 'src/app/models/report';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PopupPostComponent } from 'src/app/components/popup-post/popup-post.component';

@Component({
  selector: 'app-admin-report',
  templateUrl: './admin-report.component.html',
  styleUrls: ['./admin-report.component.scss'],
})
export class AdminReportComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'createTime',
    'reason',
    'userId',
    'delete',
  ];
  dataSource: any;
  reportdata: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private reportService: ReportService,
    private tokenService: TokenService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  ngOnInit(): void {
    this.getReports();
  }

  getReports() {
    this.reportService.getReports().subscribe((result) => {
      this.reportdata = result;

      this.dataSource = new MatTableDataSource<Report>(this.reportdata);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filterChange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }

  getRow(row: any) {}

  deletePost(postId: any) {
    this.reportService.deletePost(postId).subscribe({
      next: () => {
        this.router.navigateByUrl('/reports');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteReport(id: any) {
    this.reportService.deleteReport(id).subscribe({
      next: () => {
        this.router.navigateByUrl('/reports');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getPost(postId: string) {
    console.log(postId);
    var __popup = this.dialog.open(PopupPostComponent, {
      width: '50%',
      data: {
        postId: postId,
      },
    });
    __popup.afterClosed().subscribe((item) => {
      console.log(item);
    });
  }
}
