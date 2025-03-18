import React, { useState, useRef, useEffect } from "react";
import * as XLSX from "xlsx";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import Chip from "@mui/material/Chip";
import Popover from "@mui/material/Popover";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import Alert from "@mui/material/Alert";
import { motion } from "framer-motion";

// Import Material UI icons
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TuneIcon from "@mui/icons-material/Tune";
import RefreshIcon from "@mui/icons-material/Refresh";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import dayjs from "dayjs";
import "./HomePage.css";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDates, setSelectedDates] = useState([dayjs(), dayjs()]);
  const [searchQuery, setSearchQuery] = useState("");
  const [variationRange, setVariationRange] = useState([null, null]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [activeFilters, setActiveFilters] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  const filterRef = useRef(null);
  const rowsPerPage = 10;

  const columnNames = [
    "Date",
    "Time",
    "Cylinder Sr. No.",
    "Quarter",
    "DUE YEAR",
    "DUE DATE",
    "SET WEIGHT(Kg)",
    "TARE WEIGHT(Kg)",
    "NET WEIGHT(Kg)",
    "GROSS WEIGHT(Kg)",
    "VARIATION(Kg)",
    "Weight Status",
    "VALUE LEAK",
    "ORING LEAK",
    "SEAL",
    "BUNG STATUS",
    "CYLINDER STATUS",
  ];

  // Enhanced mock data for demonstration
  const mockData = [
    {
      createdAt: dayjs().format("YYYY-MM-DD"),
      time: "09:00:00",
      cylinderSrNo: "CYL001",
      quarter: "Q1",
      dueYear: "2025",
      dueDate: "2025-12-31",
      setWeight: "14.2",
      tareWeight: "13.2",
      netWeight: "1.0",
      grossWeight: "14.2",
      variation: "0.0",
      weightStatus: "OK",
      valueLeak: "NO",
      oringLeak: "NO",
      seal: "OK",
      bungStatus: "OK",
      cylinderStatus: "PASS"
    },
    {
      createdAt: dayjs().subtract(1, 'day').format("YYYY-MM-DD"),
      time: "10:15:00",
      cylinderSrNo: "CYL002",
      quarter: "Q2",
      dueYear: "2024",
      dueDate: "2024-06-30",
      setWeight: "14.2",
      tareWeight: "13.0",
      netWeight: "1.2",
      grossWeight: "14.2",
      variation: "0.0",
      weightStatus: "OK",
      valueLeak: "NO",
      oringLeak: "NO",
      seal: "OK",
      bungStatus: "OK",
      cylinderStatus: "PASS"
    },
    {
      createdAt: dayjs().subtract(2, 'day').format("YYYY-MM-DD"),
      time: "11:30:00",
      cylinderSrNo: "CYL003",
      quarter: "Q1",
      dueYear: "2025",
      dueDate: "2025-03-15",
      setWeight: "14.2",
      tareWeight: "13.1",
      netWeight: "1.1",
      grossWeight: "14.2",
      variation: "0.0",
      weightStatus: "OK",
      valueLeak: "YES",
      oringLeak: "NO",
      seal: "DAMAGED",
      bungStatus: "OK",
      cylinderStatus: "FAIL"
    },
    {
      createdAt: dayjs().subtract(3, 'day').format("YYYY-MM-DD"),
      time: "14:45:00",
      cylinderSrNo: "CYL004",
      quarter: "Q3",
      dueYear: "2024",
      dueDate: "2024-09-20",
      setWeight: "14.2",
      tareWeight: "13.3",
      netWeight: "0.9",
      grossWeight: "14.2",
      variation: "0.0",
      weightStatus: "OK",
      valueLeak: "NO",
      oringLeak: "YES",
      seal: "OK",
      bungStatus: "DAMAGED",
      cylinderStatus: "FAIL"
    },
    {
      createdAt: dayjs().subtract(3, 'day').format("YYYY-MM-DD"),
      time: "14:45:00",
      cylinderSrNo: "CYL005",
      quarter: "Q3",
      dueYear: "2024",
      dueDate: "2024-09-20",
      setWeight: "14.2",
      tareWeight: "13.3",
      netWeight: "0.9",
      grossWeight: "14.2",
      variation: "0.0",
      weightStatus: "OK",
      valueLeak: "NO",
      oringLeak: "YES",
      seal: "OK",
      bungStatus: "DAMAGED",
      cylinderStatus: "FAIL"
    }, 
    {
      createdAt: dayjs().subtract(3, 'day').format("YYYY-MM-DD"),
      time: "14:45:00",
      cylinderSrNo: "CYL006",
      quarter: "Q3",
      dueYear: "2024",
      dueDate: "2024-09-20",
      setWeight: "14.2",
      tareWeight: "13.3",
      netWeight: "0.9",
      grossWeight: "14.2",
      variation: "0.0",
      weightStatus: "OK",
      valueLeak: "NO",
      oringLeak: "YES",
      seal: "OK",
      bungStatus: "DAMAGED",
      cylinderStatus: "FAIL"
    },
    {
      createdAt: dayjs().subtract(3, 'day').format("YYYY-MM-DD"),
      time: "14:45:00",
      cylinderSrNo: "CYL007",
      quarter: "Q3",
      dueYear: "2024",
      dueDate: "2024-09-20",
      setWeight: "14.2",
      tareWeight: "13.3",
      netWeight: "0.9",
      grossWeight: "14.2",
      variation: "0.0",
      weightStatus: "OK",
      valueLeak: "NO",
      oringLeak: "YES",
      seal: "OK",
      bungStatus: "DAMAGED",
      cylinderStatus: "FAIL"
    },
    {
      createdAt: dayjs().subtract(3, 'day').format("YYYY-MM-DD"),
      time: "14:45:00",
      cylinderSrNo: "CYL008",
      quarter: "Q3",
      dueYear: "2024",
      dueDate: "2024-09-20",
      setWeight: "14.2",
      tareWeight: "13.3",
      netWeight: "0.9",
      grossWeight: "14.2",
      variation: "0.0",
      weightStatus: "OK",
      valueLeak: "NO",
      oringLeak: "YES",
      seal: "OK",
      bungStatus: "DAMAGED",
      cylinderStatus: "FAIL"
    },
    {
      createdAt: dayjs().subtract(3, 'day').format("YYYY-MM-DD"),
      time: "14:45:00",
      cylinderSrNo: "CYL009",
      quarter: "Q3",
      dueYear: "2024",
      dueDate: "2024-09-20",
      setWeight: "14.2",
      tareWeight: "13.3",
      netWeight: "0.9",
      grossWeight: "14.2",
      variation: "0.0",
      weightStatus: "OK",
      valueLeak: "NO",
      oringLeak: "YES",
      seal: "OK",
      bungStatus: "DAMAGED",
      cylinderStatus: "FAIL"
    },
    {
      createdAt: dayjs().subtract(3, 'day').format("YYYY-MM-DD"),
      time: "14:45:00",
      cylinderSrNo: "CYL010",
      quarter: "Q3",
      dueYear: "2024",
      dueDate: "2024-09-20",
      setWeight: "14.2",
      tareWeight: "13.3",
      netWeight: "0.9",
      grossWeight: "14.2",
      variation: "0.0",
      weightStatus: "OK",
      valueLeak: "NO",
      oringLeak: "YES",
      seal: "OK",
      bungStatus: "DAMAGED",
      cylinderStatus: "FAIL"
    },
    {
      createdAt: dayjs().subtract(3, 'day').format("YYYY-MM-DD"),
      time: "14:45:00",
      cylinderSrNo: "CYL011",
      quarter: "Q3",
      dueYear: "2024",
      dueDate: "2024-09-20",
      setWeight: "14.2",
      tareWeight: "13.3",
      netWeight: "0.9",
      grossWeight: "14.2",
      variation: "0.0",
      weightStatus: "OK",
      valueLeak: "NO",
      oringLeak: "YES",
      seal: "OK",
      bungStatus: "DAMAGED",
      cylinderStatus: "FAIL"
    },
    {
      createdAt: dayjs().subtract(3, 'day').format("YYYY-MM-DD"),
      time: "14:45:00",
      cylinderSrNo: "CYL012",
      quarter: "Q3",
      dueYear: "2024",
      dueDate: "2024-09-20",
      setWeight: "14.2",
      tareWeight: "13.3",
      netWeight: "0.9",
      grossWeight: "14.2",
      variation: "0.0",
      weightStatus: "OK",
      valueLeak: "NO",
      oringLeak: "YES",
      seal: "OK",
      bungStatus: "DAMAGED",
      cylinderStatus: "FAIL"
    },
    {
      createdAt: dayjs().subtract(3, 'day').format("YYYY-MM-DD"),
      time: "14:45:00",
      cylinderSrNo: "CYL013",
      quarter: "Q3",
      dueYear: "2024",
      dueDate: "2024-09-20",
      setWeight: "14.2",
      tareWeight: "13.3",
      netWeight: "0.9",
      grossWeight: "14.2",
      variation: "0.0",
      weightStatus: "OK",
      valueLeak: "NO",
      oringLeak: "YES",
      seal: "OK",
      bungStatus: "DAMAGED",
      cylinderStatus: "FAIL"
    },
    {
      createdAt: dayjs().subtract(3, 'day').format("YYYY-MM-DD"),
      time: "14:45:00",
      cylinderSrNo: "CYL014",
      quarter: "Q3",
      dueYear: "2024",
      dueDate: "2024-09-20",
      setWeight: "14.2",
      tareWeight: "13.3",
      netWeight: "0.9",
      grossWeight: "14.2",
      variation: "0.0",
      weightStatus: "OK",
      valueLeak: "NO",
      oringLeak: "YES",
      seal: "OK",
      bungStatus: "DAMAGED",
      cylinderStatus: "FAIL"
    },
    {
      createdAt: dayjs().subtract(3, 'day').format("YYYY-MM-DD"),
      time: "14:45:00",
      cylinderSrNo: "CYL015",
      quarter: "Q3",
      dueYear: "2024",
      dueDate: "2024-09-20",
      setWeight: "14.2",
      tareWeight: "13.3",
      netWeight: "0.9",
      grossWeight: "14.2",
      variation: "0.0",
      weightStatus: "OK",
      valueLeak: "NO",
      oringLeak: "YES",
      seal: "OK",
      bungStatus: "DAMAGED",
      cylinderStatus: "FAIL"
    },
    {
      createdAt: dayjs().subtract(3, 'day').format("YYYY-MM-DD"),
      time: "14:45:00",
      cylinderSrNo: "CYL016",
      quarter: "Q3",
      dueYear: "2024",
      dueDate: "2024-09-20",
      setWeight: "14.2",
      tareWeight: "13.3",
      netWeight: "0.9",
      grossWeight: "14.2",
      variation: "0.0",
      weightStatus: "OK",
      valueLeak: "NO",
      oringLeak: "YES",
      seal: "OK",
      bungStatus: "DAMAGED",
      cylinderStatus: "FAIL"
    },
    {
      createdAt: dayjs().subtract(3, 'day').format("YYYY-MM-DD"),
      time: "14:45:00",
      cylinderSrNo: "CYL017",
      quarter: "Q3",
      dueYear: "2024",
      dueDate: "2024-09-20",
      setWeight: "14.2",
      tareWeight: "13.3",
      netWeight: "0.9",
      grossWeight: "14.2",
      variation: "0.0",
      weightStatus: "OK",
      valueLeak: "NO",
      oringLeak: "YES",
      seal: "OK",
      bungStatus: "DAMAGED",
      cylinderStatus: "FAIL"
    },
    {
      createdAt: dayjs().subtract(3, 'day').format("YYYY-MM-DD"),
      time: "14:45:00",
      cylinderSrNo: "CYL018",
      quarter: "Q3",
      dueYear: "2024",
      dueDate: "2024-09-20",
      setWeight: "14.2",
      tareWeight: "13.3",
      netWeight: "0.9",
      grossWeight: "14.2",
      variation: "0.0",
      weightStatus: "OK",
      valueLeak: "NO",
      oringLeak: "YES",
      seal: "OK",
      bungStatus: "DAMAGED",
      cylinderStatus: "FAIL"
    },
    {
      createdAt: dayjs().subtract(3, 'day').format("YYYY-MM-DD"),
      time: "14:45:00",
      cylinderSrNo: "CYL019",
      quarter: "Q3",
      dueYear: "2024",
      dueDate: "2024-09-20",
      setWeight: "14.2",
      tareWeight: "13.3",
      netWeight: "0.9",
      grossWeight: "14.2",
      variation: "0.0",
      weightStatus: "OK",
      valueLeak: "NO",
      oringLeak: "YES",
      seal: "OK",
      bungStatus: "DAMAGED",
      cylinderStatus: "FAIL"
    },
    {
      createdAt: dayjs().subtract(3, 'day').format("YYYY-MM-DD"),
      time: "14:45:00",
      cylinderSrNo: "CYL020",
      quarter: "Q3",
      dueYear: "2024",
      dueDate: "2024-09-20",
      setWeight: "14.2",
      tareWeight: "13.3",
      netWeight: "0.9",
      grossWeight: "14.2",
      variation: "0.0",
      weightStatus: "OK",
      valueLeak: "NO",
      oringLeak: "YES",
      seal: "OK",
      bungStatus: "DAMAGED",
      cylinderStatus: "FAIL"
    },
    {
      createdAt: dayjs().subtract(3, 'day').format("YYYY-MM-DD"),
      time: "14:45:00",
      cylinderSrNo: "CYL021",
      quarter: "Q3",
      dueYear: "2024",
      dueDate: "2024-09-20",
      setWeight: "14.2",
      tareWeight: "13.3",
      netWeight: "0.9",
      grossWeight: "14.2",
      variation: "0.0",
      weightStatus: "OK",
      valueLeak: "NO",
      oringLeak: "YES",
      seal: "OK",
      bungStatus: "DAMAGED",
      cylinderStatus: "FAIL"
    },
    {
      createdAt: dayjs().subtract(3, 'day').format("YYYY-MM-DD"),
      time: "14:45:00",
      cylinderSrNo: "CYL022",
      quarter: "Q3",
      dueYear: "2024",
      dueDate: "2024-09-20",
      setWeight: "14.2",
      tareWeight: "13.3",
      netWeight: "0.9",
      grossWeight: "14.2",
      variation: "0.0",
      weightStatus: "OK",
      valueLeak: "NO",
      oringLeak: "YES",
      seal: "OK",
      bungStatus: "DAMAGED",
      cylinderStatus: "FAIL"
    },
    {
      createdAt: dayjs().subtract(3, 'day').format("YYYY-MM-DD"),
      time: "14:45:00",
      cylinderSrNo: "CYL023",
      quarter: "Q3",
      dueYear: "2024",
      dueDate: "2024-09-20",
      setWeight: "14.2",
      tareWeight: "13.3",
      netWeight: "0.9",
      grossWeight: "14.2",
      variation: "0.0",
      weightStatus: "OK",
      valueLeak: "NO",
      oringLeak: "YES",
      seal: "OK",
      bungStatus: "DAMAGED",
      cylinderStatus: "FAIL"
    },
    {
      createdAt: dayjs().subtract(3, 'day').format("YYYY-MM-DD"),
      time: "14:45:00",
      cylinderSrNo: "CYL024",
      quarter: "Q3",
      dueYear: "2024",
      dueDate: "2024-09-20",
      setWeight: "14.2",
      tareWeight: "13.3",
      netWeight: "0.9",
      grossWeight: "14.2",
      variation: "0.0",
      weightStatus: "OK",
      valueLeak: "NO",
      oringLeak: "YES",
      seal: "OK",
      bungStatus: "DAMAGED",
      cylinderStatus: "FAIL"
    },
    {
      createdAt: dayjs().subtract(3, 'day').format("YYYY-MM-DD"),
      time: "14:45:00",
      cylinderSrNo: "CYL025",
      quarter: "Q3",
      dueYear: "2024",
      dueDate: "2024-09-20",
      setWeight: "14.2",
      tareWeight: "13.3",
      netWeight: "0.9",
      grossWeight: "14.2",
      variation: "0.0",
      weightStatus: "OK",
      valueLeak: "NO",
      oringLeak: "YES",
      seal: "OK",
      bungStatus: "DAMAGED",
      cylinderStatus: "FAIL"
    },
    {
      createdAt: dayjs().subtract(3, 'day').format("YYYY-MM-DD"),
      time: "14:45:00",
      cylinderSrNo: "CYL026",
      quarter: "Q3",
      dueYear: "2024",
      dueDate: "2024-09-20",
      setWeight: "14.2",
      tareWeight: "13.3",
      netWeight: "0.9",
      grossWeight: "14.2",
      variation: "0.0",
      weightStatus: "OK",
      valueLeak: "NO",
      oringLeak: "YES",
      seal: "OK",
      bungStatus: "DAMAGED",
      cylinderStatus: "FAIL"
    },
    {
      createdAt: dayjs().subtract(3, 'day').format("YYYY-MM-DD"),
      time: "14:45:00",
      cylinderSrNo: "CYL027",
      quarter: "Q3",
      dueYear: "2024",
      dueDate: "2024-09-20",
      setWeight: "14.2",
      tareWeight: "13.3",
      netWeight: "0.9",
      grossWeight: "14.2",
      variation: "0.0",
      weightStatus: "OK",
      valueLeak: "NO",
      oringLeak: "YES",
      seal: "OK",
      bungStatus: "DAMAGED",
      cylinderStatus: "FAIL"
    },
    {
      createdAt: dayjs().subtract(3, 'day').format("YYYY-MM-DD"),
      time: "14:45:00",
      cylinderSrNo: "CYL028",
      quarter: "Q3",
      dueYear: "2024",
      dueDate: "2024-09-20",
      setWeight: "14.2",
      tareWeight: "13.3",
      netWeight: "0.9",
      grossWeight: "14.2",
      variation: "0.0",
      weightStatus: "OK",
      valueLeak: "NO",
      oringLeak: "YES",
      seal: "OK",
      bungStatus: "DAMAGED",
      cylinderStatus: "FAIL"
    },
    {
      createdAt: dayjs().subtract(3, 'day').format("YYYY-MM-DD"),
      time: "14:45:00",
      cylinderSrNo: "CYL029",
      quarter: "Q3",
      dueYear: "2024",
      dueDate: "2024-09-20",
      setWeight: "14.2",
      tareWeight: "13.3",
      netWeight: "0.9",
      grossWeight: "14.2",
      variation: "0.0",
      weightStatus: "OK",
      valueLeak: "NO",
      oringLeak: "YES",
      seal: "OK",
      bungStatus: "DAMAGED",
      cylinderStatus: "FAIL"
    },
    {
      createdAt: dayjs().subtract(4, 'day').format("YYYY-MM-DD"),
      time: "16:00:00",
      cylinderSrNo: "CYL030",
      quarter: "Q4",
      dueYear: "2023",
      dueDate: "2023-12-10",
      setWeight: "14.2",
      tareWeight: "13.4",
      netWeight: "0.8",
      grossWeight: "14.2",
      variation: "0.0",
      weightStatus: "UNDERWEIGHT",
      valueLeak: "NO",
      oringLeak: "NO",
      seal: "OK",
      bungStatus: "OK",
      cylinderStatus: "FAIL"
    }
  ];

  useEffect(() => {
    // Auto-fetch data on component mount
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call with mock data
      setTimeout(() => {
        setData(mockData);
        setFilteredData(mockData);
        setIsLoading(false);
        setDataLoaded(true);
        
        // Count active filters
        let count = 0;
        if (searchQuery) count++;
        if (variationRange[0] !== null || variationRange[1] !== null) count++;
        setActiveFilters(count);
      }, 1000);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data. Please try again.");
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      // Apply date range filter
      let filtered = mockData.filter(item => {
        const itemDate = dayjs(item.createdAt);
        return itemDate.isAfter(selectedDates[0]) && itemDate.isBefore(selectedDates[1]);
      });
      
      // Apply variation range filter if set
      if (variationRange[0] !== null || variationRange[1] !== null) {
        filtered = filtered.filter(item => {
          const variation = parseFloat(item.variation);
          if (variationRange[0] !== null && variationRange[1] !== null) {
            return variation >= variationRange[0] && variation <= variationRange[1];
          } else if (variationRange[0] !== null) {
            return variation >= variationRange[0];
          } else if (variationRange[1] !== null) {
            return variation <= variationRange[1];
          }
          return true;
        });
      }
      
      setFilteredData(filtered);
      setIsLoading(false);
      
      // Count active filters
      let count = 0;
      if (searchQuery) count++;
      if (variationRange[0] !== null || variationRange[1] !== null) count++;
      setActiveFilters(count);
    }, 800);
    
    setFilterAnchorEl(null);
    setCurrentPage(1);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    
    // Update active filters count
    let count = 0;
    if (event.target.value) count++;
    if (variationRange[0] !== null || variationRange[1] !== null) count++;
    setActiveFilters(count);
  };

  const filteredBySearch = filteredData.filter((row) =>
    row.cylinderSrNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBySearch.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentTableData = filteredBySearch.slice(indexOfFirstRow, indexOfLastRow);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDownload = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const workbook = XLSX.utils.book_new();
      const worksheetData = [
        columnNames,
        ...filteredBySearch.map((item) => [
          dayjs(item.createdAt).format("DD-MM-YYYY") || "N/A",
          dayjs(item.time, "HH:mm:ss").format("HH:mm") || "N/A",
          item.cylinderSrNo || "N/A",
          item.quarter || "N/A",
          item.dueYear || "N/A",
          item.dueDate || "N/A",
          item.setWeight || "N/A",
          item.tareWeight || "N/A",
          item.netWeight || "N/A",
          item.grossWeight || "N/A",
          item.variation || "N/A",
          item.weightStatus || "N/A",
          item.valueLeak || "N/A",
          item.oringLeak || "N/A",
          item.seal || "N/A",
          item.bungStatus || "N/A",
          item.cylinderStatus || "N/A",
        ]),
      ];

      const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
      XLSX.utils.book_append_sheet(workbook, worksheet, "SQC Report");
      XLSX.writeFile(workbook, "SQC_Report.xlsx");
      setIsLoading(false);
    }, 800);
  };

  const handleReset = () => {
    setFilteredData(mockData);
    setSelectedDates([dayjs(), dayjs()]);
    setSearchQuery("");
    setVariationRange([null, null]);
    setCurrentPage(1);
    setActiveFilters(0);
  };

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleDateRangeClick = () => {
    // Open the filter dropdown when date range is clicked
    setFilterAnchorEl(filterRef.current);
  };

  const open = Boolean(filterAnchorEl);
  const id = open ? 'filter-popover' : undefined;

  // Get status color based on cylinder status
  const getStatusColor = (status) => {
    switch(status) {
      case 'PASS':
        return '#28a745';
      case 'FAIL':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  // Get status color for specific checks
  const getCheckColor = (value) => {
    if (value === 'OK' || value === 'NO') return '#28a745';
    if (value === 'DAMAGED' || value === 'YES' || value === 'UNDERWEIGHT') return '#dc3545';
    return '#6c757d';
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Paper 
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        elevation={3} 
        sx={{ 
          borderRadius: 3, 
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
        }}
      >
        <Box sx={{ 
          p: 3, 
          background: 'linear-gradient(120deg, #0056b3, #0077cc)',
          color: 'white'
        }}>
          <Typography 
            variant="h5" 
            component="h2" 
            sx={{ 
              fontWeight: 'bold', 
              mb: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            <TuneIcon /> Cylinder Quality Control Report
          </Typography>
          <Typography variant="body2">
            Monitor and analyze cylinder quality metrics with comprehensive filtering and export options
          </Typography>
        </Box>
        
        <Box sx={{ p: 3, bgcolor: '#f8f9fa' }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 3, 
            flexWrap: 'wrap', 
            gap: 2,
            justifyContent: 'space-between'
          }}>
            <Tooltip title="Click to change date range">
              <Chip
                label={`Date Range: ${selectedDates[0].format("DD MMM YYYY")} - ${selectedDates[1].format("DD MMM YYYY")}`}
                onClick={handleDateRangeClick}
                color="primary"
                variant="outlined"
                icon={<CalendarMonthIcon />}
                sx={{ 
                  height: '40px', 
                  borderRadius: '20px',
                  px: 1,
                  '& .MuiChip-label': { 
                    fontWeight: 'medium',
                    fontSize: '0.9rem'
                  }
                }}
              />
            </Tooltip>
            
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1.5,
              flexWrap: 'wrap'
            }}>
              <TextField
                placeholder="Search by Cylinder Sr. No."
                value={searchQuery}
                onChange={handleSearch}
                variant="outlined"
                size="small"
                sx={{ 
                  width: '240px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '20px',
                    bgcolor: 'white'
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
              
              <Tooltip title="Open filter options">
                <Badge badgeContent={activeFilters} color="error" overlap="circular">
                  <Button
                    variant="contained"
                    startIcon={<FilterAltIcon />}
                    onClick={handleFilterClick}
                    ref={filterRef}
                    color="primary"
                    sx={{ 
                      borderRadius: '20px',
                      px: 2,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  >
                    FILTER
                  </Button>
                </Badge>
              </Tooltip>
              
              <Tooltip title="Export data to Excel">
                <Button
                  variant="contained"
                  startIcon={<FileDownloadIcon />}
                  onClick={handleDownload}
                  color="success"
                  sx={{ 
                    borderRadius: '20px',
                    px: 2,
                    bgcolor: '#28a745',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  EXPORT
                </Button>
              </Tooltip>
              
              <Tooltip title="Refresh data">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={fetchData}
                  sx={{ 
                    minWidth: '40px',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    p: 0
                  }}
                >
                  <RefreshIcon />
                </Button>
              </Tooltip>
            </Box>
          </Box>
        </Box>

        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
            <CircularProgress size={60} thickness={4} />
          </Box>
        )}

        {!isLoading && dataLoaded && filteredBySearch.length === 0 && (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Alert 
              severity="info" 
              icon={<InfoIcon fontSize="large" />}
              sx={{ 
                mb: 2, 
                justifyContent: 'center',
                '& .MuiAlert-message': { fontSize: '1rem' }
              }}
            >
              No data found matching your search criteria
            </Alert>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<RestartAltIcon />}
              onClick={handleReset}
              sx={{ mt: 2 }}
            >
              Reset Filters
            </Button>
          </Box>
        )}

        {!isLoading && dataLoaded && filteredBySearch.length > 0 && (
          <Fade in={!isLoading}>
            <Box>
              <Paper elevation={0} sx={{ mx: 3, mb: 3, overflow: 'hidden', borderRadius: 2, border: '1px solid #e0e0e0' }}>
                <div className="table-wrapper">
                  <div className="frozen-columns">
                    <table>
                      <thead>
                        <tr>
                          {columnNames.slice(0, 3).map((name, index) => (
                            <th key={index} style={{ 
                              backgroundColor: '#f0f7ff', 
                              color: '#0056b3',
                              borderBottom: '2px solid #0056b3'
                            }}>
                              {name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {currentTableData.map((row, rowIndex) => (
                          <tr key={rowIndex} style={{ 
                            backgroundColor: rowIndex % 2 === 0 ? '#ffffff' : '#f9f9f9',
                            transition: 'background-color 0.2s'
                          }}>
                            <td>{dayjs(row.createdAt).format("DD-MM-YYYY")}</td>
                            <td>{dayjs(row.time, "HH:mm:ss").format("HH:mm")}</td>
                            <td style={{ fontWeight: 'bold' }}>{row.cylinderSrNo}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="able-table">
                    <table>
                      <thead>
                        <tr>
                          {columnNames.slice(3).map((name, index) => (
                            <th key={index} style={{ 
                              backgroundColor: '#f0f7ff', 
                              color: '#0056b3',
                              borderBottom: '2px solid #0056b3'
                            }}>
                              {name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {currentTableData.map((row, rowIndex) => (
                          <tr key={rowIndex} style={{ 
                            backgroundColor: rowIndex % 2 === 0 ? '#ffffff' : '#f9f9f9',
                            transition: 'background-color 0.2s'
                          }}>
                            <td>{row.quarter}</td>
                            <td>{row.dueYear}</td>
                            <td>{row.dueDate}</td>
                            <td>{row.setWeight}</td>
                            <td>{row.tareWeight}</td>
                            <td>{row.netWeight}</td>
                            <td>{row.grossWeight}</td>
                            <td>{row.variation}</td>
                            <td style={{ 
                              color: getCheckColor(row.weightStatus),
                              fontWeight: 'bold'
                            }}>
                              {row.weightStatus}
                            </td>
                            <td style={{ 
                              color: getCheckColor(row.valueLeak),
                              fontWeight: 'bold'
                            }}>
                              {row.valueLeak}
                            </td>
                            <td style={{ 
                              color: getCheckColor(row.oringLeak),
                              fontWeight: 'bold'
                            }}>
                              {row.oringLeak}
                            </td>
                            <td style={{ 
                              color: getCheckColor(row.seal),
                              fontWeight: 'bold'
                            }}>
                              {row.seal}
                            </td>
                            <td style={{ 
                              color: getCheckColor(row.bungStatus),
                              fontWeight: 'bold'
                            }}>
                              {row.bungStatus}
                            </td>
                            <td style={{ 
                              backgroundColor: getStatusColor(row.cylinderStatus),
                              color: 'white',
                              fontWeight: 'bold',
                              borderRadius: '4px'
                            }}>
                              {row.cylinderStatus === 'PASS' ? (
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                                  <CheckCircleIcon fontSize="small" /> PASS
                                </Box>
                              ) : (
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                                  <ErrorIcon fontSize="small" /> FAIL
                                </Box>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Paper>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3, mb: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Showing {indexOfFirstRow + 1}-{Math.min(indexOfLastRow, filteredBySearch.length)} of {filteredBySearch.length} records
                </Typography>
                
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="outlined"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    sx={{ borderRadius: '20px', minWidth: '40px' }}
                  >
                    Prev
                  </Button>
                  {totalPages <= 5 ? (
                    [...Array(totalPages).keys()].map((_, index) => (
                      <Button
                        key={index}
                        variant={currentPage === index + 1 ? "contained" : "outlined"}
                        color="primary"
                        onClick={() => handlePageChange(index + 1)}
                        sx={{ 
                          borderRadius: '50%', 
                          minWidth: '40px',
                          width: '40px',
                          height: '40px',
                          p: 0
                        }}
                      >
                        {index + 1}
                      </Button>
                    ))
                  ) : (
                    <>
                      {currentPage > 2 && (
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handlePageChange(1)}
                          sx={{ 
                            borderRadius: '50%', 
                            minWidth: '40px',
                            width: '40px',
                            height: '40px',
                            p: 0
                          }}
                        >
                          1
                        </Button>
                      )}
                      
                      {currentPage > 3 && (
                        <Typography variant="body1" sx={{ alignSelf: 'center' }}>...</Typography>
                      )}
                      
                      {currentPage > 1 && (
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handlePageChange(currentPage - 1)}
                          sx={{ 
                            borderRadius: '50%', 
                            minWidth: '40px',
                            width: '40px',
                            height: '40px',
                            p: 0
                          }}
                        >
                          {currentPage - 1}
                        </Button>
                      )}
                      
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ 
                          borderRadius: '50%', 
                          minWidth: '40px',
                          width: '40px',
                          height: '40px',
                          p: 0
                        }}
                      >
                        {currentPage}
                      </Button>
                      
                      {currentPage < totalPages && (
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handlePageChange(currentPage + 1)}
                          sx={{ 
                            borderRadius: '50%', 
                            minWidth: '40px',
                            width: '40px',
                            height: '40px',
                            p: 0
                          }}
                        >
                          {currentPage + 1}
                        </Button>
                      )}
                      
                      {currentPage < totalPages - 2 && (
                        <Typography variant="body1" sx={{ alignSelf: 'center' }}>...</Typography>
                      )}
                      
                      {currentPage < totalPages - 1 && (
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handlePageChange(totalPages)}
                          sx={{ 
                            borderRadius: '50%', 
                            minWidth: '40px',
                            width: '40px',
                            height: '40px',
                            p: 0
                          }}
                        >
                          {totalPages}
                        </Button>
                      )}
                    </>
                  )}
                  <Button
                    variant="outlined"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    sx={{ borderRadius: '20px', minWidth: '40px' }}
                  >
                    Next
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Fade>
        )}

        <Popover
          id={id}
          open={open}
          anchorEl={filterAnchorEl}
          onClose={handleFilterClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          PaperProps={{
            sx: { 
              borderRadius: 2,
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
            }
          }}
        >
          <Paper sx={{ p: 3, width: '350px' }}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2, 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                color: '#0056b3'
              }}
            >
              <FilterAltIcon /> Filter Options
            </Typography>
            
            <Divider sx={{ mb: 2 }} />
            
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  mb: 1, 
                  color: '#555',
                  fontWeight: 'bold'
                }}
              >
                Date Range
              </Typography>
              <div className="box-date">
                <DatePicker
                  label="Start Date"
                  value={selectedDates[0]}
                  onChange={(newValue) => setSelectedDates([newValue, selectedDates[1]])}
                  slotProps={{ 
                    textField: { 
                      size: 'small', 
                      fullWidth: true,
                      sx: { mb: 2 }
                    } 
                  }}
                />
                <DatePicker
                  label="End Date"
                  value={selectedDates[1]}
                  onChange={(newValue) => setSelectedDates([selectedDates[0], newValue])}
                  slotProps={{ 
                    textField: { 
                      size: 'small', 
                      fullWidth: true,
                      sx: { mb: 2 }
                    } 
                  }}
                />
              </div>

              <Typography 
                variant="subtitle2" 
                sx={{ 
                  mt: 2, 
                  mb: 1,
                  color: '#555',
                  fontWeight: 'bold'
                }}
              >
                Variation Range (Kg)
              </Typography>
              <div className="variation-filter">
                <TextField
                  label="From"
                  type="number"
                  value={variationRange[0] || ""}
                  onChange={(e) => setVariationRange([Math.max(0, e.target.value || 0), variationRange[1]])}
                  size="small"
                  InputProps={{
                    inputProps: { min: 0, step: 0.1 }
                  }}
                />
                <TextField
                  label="To"
                  type="number"
                  value={variationRange[1] || ""}
                  onChange={(e) => setVariationRange([variationRange[0], Math.max(0, e.target.value || 0)])}
                  size="small"
                  InputProps={{
                    inputProps: { min: 0, step: 0.1 }
                  }}
                />
              </div>
            </LocalizationProvider>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
              <Button 
                variant="outlined" 
                color="secondary"
                onClick={() => {
                  handleReset();
                  handleFilterClose();
                }}
                startIcon={<RestartAltIcon />}
                sx={{ 
                  borderRadius: '20px',
                  flex: 1,
                  py: 0.5,
                  fontSize: '0.8rem',
                  height: '32px'
                }}
                size="small"
              >
                Reset 
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={applyFilters}
                startIcon={<FilterAltIcon />}
                sx={{ 
                  borderRadius: '20px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  flex: 1,
                  py: 0.5,
                  fontSize: '0.8rem',
                  height: '32px'
                }}
                size="small"
              >
                Apply Filters
              </Button>
            </Box>
          </Paper>
        </Popover>
      </Paper>
    </Container>
  );
};

export default HomePage;
