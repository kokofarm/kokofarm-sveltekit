<script>
  import { name } from '@store/mainStore'
  import { page } from '$app/stores'
  import { onMount } from 'svelte';
  import { isBrowser, isMobile } from 'react-device-detect';
  import TopCollapseItem from '../../../components/Top_collapse_item.svelte';

  onMount(async () => {
		const userLanguage = navigator.language;
    const { lang = 'ko' } = $page.params;
    
    console.log('lang: ' + lang)
    console.log('isMobile: ' + isMobile)
    console.log('language: ' + userLanguage)
	});

  

  const topCollapseItems = [
    {id: 1, title: '입추(동)', value: '5'},
    {id: 2, title: '입추수수', value: '131867'},
    {id: 3, title: '생존수수', value: '130730'},
    {id: 4, title: '폐사수수', value: '41'},
    {id: 5, title: '도태수수', value: '68'},
    {id: 6, title: '솎기수수', value: '0'},
  ]

  $: showData = ''

  const fetchData = () => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => {
        console.log(json)
        showData = JSON.stringify(json)
      })
  }
</script>

<!-- Begin page -->
<div>
  <button on:click={fetchData}>Fetch</button>
  <p>{showData}</p>
  <header id="page-topbar">

    <!--navbar-header-->
    <div class="navbar-header">
      <div class="d-flex">
        <!-- LOGO -->

        <div class="navbar-brand-box">
          <a
            href="javascript:void(0)"
            onClick=" location.href='../01/0101.php'"
            class="logo logo-dark"
          >
            <span class="logo-sm"
              ><img
                src="/images/logo.png"
                alt=""
                height="26"
              /></span
            >
            <span class="logo-lg"
              ><img
                src="/images/logo.png"
                alt=""
                height="26"
              /></span
            >
          </a>
          <a
            href="javascript:void(0)"
            onClick=" location.href='../01/0101.php'"
            class="logo logo-light"
          >
            <span class="logo-sm"
              ><img
                src="/images/logo.png"
                alt=""
                height="26"
              /></span
            >
            <span class="logo-lg"
              ><img
                src="/images/logo.png"
                alt=""
                height="26"
              /></span
            >
          </a>
        </div>

        <button
          type="button"
          class="btn btn-sm px-3 font-size-16 d-lg-none header-item"
          data-bs-toggle="collapse"
          id="horimenu-btn"
          data-bs-target="#topnav-menu-content"
        >
          <i class="fa fa-fw fa-bars"></i>
        </button>

        <div class="topnav">
          <nav
            class="navbar navbar-light navbar-expand-lg topnav-menu"
          >
            <div
              class="collapse navbar-collapse"
              id="topnav-menu-content"
            >
              <ul class="navbar-nav">
                <li class="nav-item active">
                  <a
                    class="nav-link dropdown-toggle arrow-none"
                    href="javascript:void(0)"
                    onClick=" location.href='../01/0101.php' "
                  >
                    <i class="bx bx bx-home-circle icon"
                    ></i> <span>DashBoard</span>
                  </a>
                </li>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle arrow-none"
                    href="javascript:void(0)"
                    role="button"
                  >
                    <i class="bx bx bx-customize icon"
                    ></i> <span>모니터링</span>
                    <div class="arrow-down"></div>
                  </a>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="topnav-pages"
                  >
                    <a
                      href="javascript:void(0)"
                      onClick=" location.href='../02/0201.php' "
                      class="dropdown-item"
                      >입추농장 현황</a
                    >
                    <a
                      href="javascript:void(0)"
                      onClick=" location.href='../02/0202.php' "
                      class="dropdown-item"
                      >출하농장 현황</a
                    >
                    <a
                      href="javascript:void(0)"
                      onClick=" location.href='../02/0203.php' "
                      class="dropdown-item"
                      >카메라별 현황</a
                    >
                    <a
                      href="javascript:void(0)"
                      onClick=" location.href='../02/0204.php' "
                      class="dropdown-item"
                      >농장지도 현황</a
                    >
                    <a
                      href="javascript:void(0)"
                      onClick=" location.href='../02/0205.php' "
                      class="dropdown-item"
                      >농장별 장치현황</a
                    >
                  </div>
                </li>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle arrow-none"
                    href="javascript:void(0)"
                    role="button"
                  >
                    <i class="bx bx bx-calendar icon"
                    ></i> <span>수요예측</span>
                    <div class="arrow-down"></div>
                  </a>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="topnav-pages"
                  >
                    <a
                      href="javascript:void(0)"
                      onClick=" location.href='../03/0301.php' "
                      class="dropdown-item"
                      >출하예측 달력</a
                    >
                    <a
                      href="javascript:void(0)"
                      onClick=" location.href='../03/0302.php' "
                      class="dropdown-item"
                      >사료수요 예측</a
                    >
                  </div>
                </li>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle arrow-none"
                    href="javascript:void(0)"
                    role="button"
                  >
                    <i class="bx bx bx-line-chart icon"
                    ></i> <span>농장분석</span>
                    <div class="arrow-down"></div>
                  </a>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="topnav-pages"
                  >
                    <a
                      href="javascript:void(0)"
                      onClick=" location.href='../04/0401.php' "
                      class="dropdown-item"
                      >출하이력</a
                    >
                    <a
                      href="javascript:void(0)"
                      onClick=" location.href='../04/0402.php' "
                      class="dropdown-item"
                      >실적비교</a
                    >
                    <a
                      href="javascript:void(0)"
                      onClick=" location.href='../04/0403.php' "
                      class="dropdown-item"
                      >출하패턴 분석</a
                    >
                  </div>
                </li>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle arrow-none"
                    href="javascript:void(0)"
                    role="button"
                  >
                    <i class="bx bx bx-paste icon"></i>
                    <span>농장운영</span>
                    <div class="arrow-down"></div>
                  </a>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="topnav-pages"
                  >
                    <a
                      href="javascript:void(0)"
                      onClick=" location.href='../05/0501.php' "
                      class="dropdown-item"
                      >강제 입·출하</a
                    >
                    <a
                      href="javascript:void(0)"
                      onClick=" location.href='../05/0502.php' "
                      class="dropdown-item"
                      >사육일지 관리</a
                    >
                    <a
                      href="javascript:void(0)"
                      onClick=" location.href='../05/0503.php' "
                      class="dropdown-item"
                      >출하내역 관리</a
                    >
                    <a
                      href="javascript:void(0)"
                      onClick=" location.href='../05/0504.php' "
                      class="dropdown-item"
                      >Ping Test</a
                    >
                  </div>
                </li>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle arrow-none"
                    href="javascript:void(0)"
                    role="button"
                  >
                    <i class="bx bx bx-wrench icon"></i>
                    <span>CMS</span>
                    <div class="arrow-down"></div>
                  </a>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="topnav-pages"
                  >
                    <a
                      href="javascript:void(0)"
                      onClick=" location.href='../06/0601.php' "
                      class="dropdown-item"
                      >관리자 계정관리</a
                    >
                    <a
                      href="javascript:void(0)"
                      onClick=" location.href='../06/0602.php' "
                      class="dropdown-item"
                      >농장 계정관리</a
                    >
                    <a
                      href="javascript:void(0)"
                      onClick=" location.href='../06/0603.php' "
                      class="dropdown-item"
                      >농장(동) 관리</a
                    >
                    <a
                      href="javascript:void(0)"
                      onClick=" location.href='../06/0604.php' "
                      class="dropdown-item"
                      >연결장치 관리</a
                    >
                    <a
                      href="javascript:void(0)"
                      onClick=" location.href='../06/0605.php' "
                      class="dropdown-item"
                      >IP카메라 관리</a
                    >
                    <a
                      href="javascript:void(0)"
                      onClick=" location.href='../06/0607.php' "
                      class="dropdown-item"
                      >PLC 관리</a
                    >
                    <a
                      href="javascript:void(0)"
                      onClick=" location.href='../06/0606.php' "
                      class="dropdown-item"
                      >품종관리</a
                    >
                    <a
                      href="javascript:void(0)"
                      onClick=" location.href='../06/0609.php' "
                      class="dropdown-item"
                      >상세옵션 관리</a
                    >
                  </div>
                </li>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle arrow-none"
                    href="javascript:void(0)"
                    role="button"
                  >
                    <i class="bx bx bx-task icon"></i>
                    <span>기타관리</span>
                    <div class="arrow-down"></div>
                  </a>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="topnav-pages"
                  >
                    <a
                      href="javascript:void(0)"
                      onClick=" location.href='../07/0701.php' "
                      class="dropdown-item"
                      >공지사항</a
                    >
                    <a
                      href="javascript:void(0)"
                      onClick=" location.href='../07/0702.php' "
                      class="dropdown-item">A/S이력</a
                    >
                  </div>
                </li>
              </ul>
            </div>
            <!--collapse-->
          </nav>
        </div>
        <!--topnav-->
      </div>
      <!--d-flex-->

      <div class="d-flex">
        <!--농장검색버튼-->
        <div class="dropdown d-inline-block">
          <button
            type="button"
            class="btn header-item noti-icon"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasWithBothOptions"
            aria-controls="offcanvasWithBothOptions"
          >
            <i
              class="bx bx-search icon-sm"
              style="vertical-align: bottom"
            ></i>
            <span>농장검색</span>
          </button>
        </div>
        <!--농장검색버튼-->


        <!--언어선택-->
        <div class="dropdown d-inline-block language-switch">
          <button
            type="button"
            class="btn header-item noti-icon"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <img
              id="header-lang-img"
              src="/images/flags/us.jpg"
              alt="Header Language"
              height="16"
            />
          </button>
          <div class="dropdown-menu dropdown-menu-end">
            <a
              href="javascript:void(0);"
              class="dropdown-item notify-item language"
              data-lang="eng"
              ><img
                src="/images/flags/us.jpg"
                alt="user-image"
                class="me-2"
                height="12"
              /> <span class="align-middle">English</span></a
            >
            <a
              href="javascript:void(0);"
              class="dropdown-item notify-item language"
              data-lang="sp"
              ><img
                src="/images/flags/spain.jpg"
                alt="user-image"
                class="me-2"
                height="12"
              /> <span class="align-middle">Spanish</span></a
            >
          </div>
        </div>
        <!--언어선택--->

        <!--공지사항-->
        <div class="dropdown d-inline-block">
          <button
            type="button"
            class="btn header-item noti-icon"
            id="page-header-notifications-dropdown"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="bx bx-bell icon-sm"></i><span
              class="noti-dot bg-danger rounded-pill"
              ><span id="topNoticeNotReadCNT">0</span></span
            >
          </button>
          <div
            class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
            aria-labelledby="page-header-notifications-dropdown"
          >
            <div class="p-3">
              <div class="row align-items-center">
                <div class="col">
                  <h5 class="m-0 font-size-15">
                    공지사항
                  </h5>
                </div>
              </div>
            </div>
            <div data-simplebar style="max-height:250px;">
              <div class="text-reset notification-item">
                <div
                  class="d-flex border-bottom align-items-start"
                >
                  <div class="flex-shrink-0">
                    <div class="avatar-sm me-3">
                      <span
                        class="avatar-title bg-primary rounded-circle font-size-16"
                        ><i class="bx bx-bell"
                        ></i></span
                      >
                    </div>
                  </div>
                  <div class="flex-grow-1">
                    <h6 class="mb-1">
                      kokofarm23 서비스시작
                    </h6>
                    <div
                      class="text-muted"
                      style="max-height:40px;overflow:hidden"
                    >
                      <p class="mb-1 font-size-13">
                        안녕하세요. KOKOFARM23
                        서비스를 시작합니다. 보다 더
                        나은 서비스를 위해 최선을
                        다하겠습니다. 감사합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="p-2 border-top d-grid">
              <a
                class="btn btn-sm btn-link font-size-14 btn-block text-center"
                href="javascript:void(0)"
                onClick=" location.href='../20/mypage.php' "
              >
                <i class="uil-arrow-circle-right me-1"></i>
                <span>더 보기</span>
              </a>
            </div>
          </div>
        </div>
        <!--공지사항-->

        <!--계정정보-->
        <div class="dropdown d-inline-block">
          <button
            type="button"
            class="btn header-item user text-start d-flex align-items-center"
            id="page-header-user-dropdown"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span class="user-name"
              >이모션-이모션&nbsp;&nbsp;<i
                class="mdi mdi-chevron-down"
              ></i></span
            >
          </button>
          <div class="dropdown-menu dropdown-menu-end pt-0">
            <h6 class="dropdown-header">[수퍼관리자]</h6>
            <a
              class="dropdown-item"
              href="javascript:void(0)"
              onClick=" location.href='../20/mypage.php' "
              ><i
                class="mdi mdi-account-edit-outline text-muted font-size-16 align-middle me-1"
              ></i>
              <span class="align-middle">정보수정</span></a
            >
            <a
              class="dropdown-item"
              href="javascript:void(0)"
              onClick=" location.href='../20/mypage.php' "
              ><i
                class="mdi mdi-cog-outline text-muted font-size-16 align-middle me-1"
              ></i>
              <span class="align-middle">관리농장</span></a
            >
            <div class="dropdown-divider"></div>
            <a
              class="dropdown-item"
              href="javascript:void(0)"
              onClick=" location.href='../20/login_action.php?oper=logOut' "
              ><i
                class="mdi mdi-logout text-muted font-size-16 align-middle me-1"
              ></i>
              <span class="align-middle">로그아웃</span></a
            >
          </div>
        </div>
        <!--계정정보-->
      </div>
      <!---d-flex-->
    </div>
    <!--navbar-header-->

    <!--top collapse start-->
    <div class="collapse show dash-content" id="dashtoggle">
      <div class="container-fluid">
        <!-- start page title -->
        <div class="row">
          <div class="col-12">
            <div
              class="page-title-box d-flex align-items-center justify-content-between"
            >
              <h4 class="mb-0">입추요약</h4>
              <div class="page-title-right">
                <ol class="breadcrumb m-0">
                  <li class="breadcrumb-item">
                    <a
                      href="javascript: void(0);"
                      onClick="location.href='../01/0101.php'"
                      >DashBoard</a
                    >
                  </li>
                  <li class="breadcrumb-item active">
                    입추요약
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <!-- end page title -->

        <!-- start dash info -->
        <div class="row">
          <div class="col-xl-12">
            <div
              class="card dash-header-box shadow-none border-0"
            >
              <div class="card-body p-0">
                <div class="row row-cols-xxl-6 row-cols-md-3 row-cols-1 g-0">
                 
                  { #each topCollapseItems as item (item.id) }
                    <TopCollapseItem data={item} />
                  { /each }

                </div>
                <!-- end row -->
              </div>
              <!-- end card body -->
            </div>
            <!-- end card -->
          </div>
          <!-- end col -->
        </div>
        <!-- end dash info -->
      </div>
      <!--container-fluid-->
    </div>

    <!-- start dash toggle-icon -->
    <div>
      <a
        class="dash-troggle-icon"
        id="dash-troggle-icon"
        data-bs-toggle="collapse"
        href="#dashtoggle"
        aria-expanded="true"
        aria-controls="dashtoggle"
        ><i class="bx bx-up-arrow-alt"></i></a
      >
    </div>
    <!-- end dash toggle-icon -->
    <!--top collapse end -->
    
  </header>

  <div class="hori-overlay"></div>

  <!-- ============================================================== -->
  <!-- Start right Content here -->
  <!-- ============================================================== -->
  <div class="main-content">
    <div class="page-content">
      <div class="container-fluid">
        <!---2열(start)-------------------------------------------->
        <div class="row">
          <!--육계 사육현황--------------------------->
          <div class="col-xl-4">
            <div class="card">
              <div class="card-header">
                <h5>육계 사육현황</h5>
              </div>
              <!--card-header-->
              <div class="card-body">
                <div class="row g-0 border-top">
                  <div class="col-xl-4">
                    <div
                      class="border-start border-end p-3 h-100"
                    >
                      <div>
                        <p
                          class="font-size-20 mb-2"
                        >
                          전체농장
                        </p>
                        <div
                          class="badge badge-soft-primary font-size-12"
                        >
                          등록농장
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-4">
                    <div class="border-end p-3 h-100">
                      <div>
                        <h3 class="mb-0">
                          <span
                            id="broilerTotDong"
                            >0</span
                          >
                        </h3>
                        <p
                          class="text-muted font-size-13 mb-2"
                        >
                          등록(동)
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-4">
                    <div class="border-end p-3 h-100">
                      <div>
                        <h3 class="mb-0">
                          <span
                            id="broilerTotScale"
                            >0</span
                          >
                        </h3>
                        <p
                          class="text-muted font-size-13 mb-2"
                        >
                          사육규모
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row g-0 border-top">
                  <div class="col-xl-4">
                    <div
                      class="border-start border-end border-bottom p-3 h-100"
                    >
                      <div>
                        <p
                          class="font-size-20 mb-2"
                        >
                          사육농장
                        </p>
                        <div
                          class="badge bg-primary font-size-12"
                        >
                          입추농장
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-4">
                    <div
                      class="border-end border-bottom p-3 h-100"
                    >
                      <div>
                        <h3 class="mb-0">
                          <span id="broilerInDong"
                            >0</span
                          >
                        </h3>
                        <p
                          class="text-muted font-size-13 mb-2"
                        >
                          등록(동)
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-4">
                    <div
                      class="border-end border-bottom p-3 h-100"
                    >
                      <div>
                        <h3 class="mb-0">
                          <span
                            id="broilerInSurvivesu"
                            >0</span
                          >
                        </h3>
                        <p
                          class="text-muted font-size-13 mb-2"
                        >
                          생존수수
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <hr />

                <div class="row">
                  <div class="col-xl-3 text-center">
                    <h2
                      class="display-5 text-secondary mb-0"
                    >
                      <span
                        id="broilerNormal"
                        style="font-weight:bold"
                        >0</span
                      >
                    </h2>
                    <p class="text-black-60 mb-0">
                      원활
                    </p>
                  </div>
                  <div class="col-xl-3 text-center">
                    <h2
                      class="display-5 text-success mb-0"
                    >
                      <span
                        id="broilerCaution"
                        style="font-weight:bold"
                        >0</span
                      >
                    </h2>
                    <p class="text-black-60 mb-0">
                      주의
                    </p>
                  </div>
                  <div class="col-xl-3 text-center">
                    <h2
                      class="display-5 text-warning mb-0"
                    >
                      <span
                        id="broilerWarning"
                        style="font-weight:bold"
                        >0</span
                      >
                    </h2>
                    <p class="text-black-60 mb-0">
                      경고
                    </p>
                  </div>
                  <div class="col-xl-3 text-center">
                    <h2
                      class="display-5 text-danger mb-0"
                    >
                      <span
                        id="broilerDanger"
                        style="font-weight:bold"
                        >0</span
                      >
                    </h2>
                    <p class="text-black-60 mb-0">
                      위험
                    </p>
                  </div>
                </div>
                <!--row-->
              </div>
              <!--card-body-->
            </div>
            <!--card-->
          </div>
          <!--col-xl-4-->

          <!--부화장 현황--------------------------->
          <div class="col-xl-4">
            <div class="card">
              <div class="card-header">
                <h5>부화장 현황</h5>
              </div>
              <!--card-header-->
              <div class="card-body">
                <div class="row g-0">
                  <div
                    class="social-box row align-items-center border-bottom pt-0 g-0"
                  >
                    <div class="col-12 col-sm-5">
                      <div
                        class="d-flex align-items-center"
                      >
                        <div
                          class="flex-shrink-0 me-3"
                        >
                          <div class="avatar">
                            <div
                              class="avatar-title rounded bg-secondary"
                            >
                              <i
                                class="mdi mdi-egg-easter font-size-20"
                              ></i>
                            </div>
                          </div>
                        </div>
                        <div
                          class="flex-grow-1 overflow-hidden"
                        >
                          <h5
                            class="font-size-15 mb-1 text-truncate"
                          >
                            삼기 부화장
                          </h5>
                          <p
                            class="text-muted mb-0"
                          >
                            원활-30일령
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col col-sm-3">
                      <div
                        class="mt-3 mt-md-0 text-md-end"
                      >
                        <h5
                          class="font-size-15 mb-1 text-truncate"
                        >
                          15.1℃
                        </h5>
                        <p class="text-muted mb-0">
                          <span
                            class="badge bg-secondary"
                            ><i
                              class="mdi mdi-arrow-top-right me-1"
                            ></i>0.1℃</span
                          >
                        </p>
                      </div>
                    </div>
                    <div class="col-auto col-sm-4">
                      <div
                        class="mt-3 mt-md-0 text-end"
                      >
                        <h5
                          class="font-size-15 mb-1 text-truncate"
                        >
                          75.0％
                        </h5>
                        <p class="text-muted mb-0">
                          <span
                            class="badge bg-secondary"
                            ><i
                              class="mdi mdi-arrow-top-right me-1"
                            ></i>2％</span
                          >
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  class="row g-0"
                  style="padding-top:16px"
                >
                  <div
                    class="social-box row align-items-center border-bottom pt-0 g-0"
                  >
                    <div class="col-12 col-sm-5">
                      <div
                        class="d-flex align-items-center"
                      >
                        <div
                          class="flex-shrink-0 me-3"
                        >
                          <div class="avatar">
                            <div
                              class="avatar-title rounded bg-success"
                            >
                              <i
                                class="mdi mdi-egg-easter font-size-20"
                              ></i>
                            </div>
                          </div>
                        </div>
                        <div
                          class="flex-grow-1 overflow-hidden"
                        >
                          <h5
                            class="font-size-15 mb-1 text-truncate"
                          >
                            무장 부화장
                          </h5>
                          <p
                            class="text-muted mb-0"
                          >
                            주의-30일령
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col col-sm-3">
                      <div
                        class="mt-3 mt-md-0 text-md-end"
                      >
                        <h5
                          class="font-size-15 mb-1 text-truncate"
                        >
                          17.0℃
                        </h5>
                        <p class="text-muted mb-0">
                          <span
                            class="badge bg-success"
                            ><i
                              class="mdi mdi-arrow-top-right me-1"
                            ></i>2℃</span
                          >
                        </p>
                      </div>
                    </div>
                    <div class="col-auto col-sm-4">
                      <div
                        class="mt-3 mt-md-0 text-end"
                      >
                        <h5
                          class="font-size-15 mb-1 text-truncate"
                        >
                          69.0％
                        </h5>
                        <p class="text-muted mb-0">
                          <span
                            class="badge bg-success"
                            ><i
                              class="mdi mdi-arrow-bottom-right me-1"
                            ></i>-6％</span
                          >
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  class="row g-0"
                  style="padding-top:16px"
                >
                  <div
                    class="social-box row align-items-center border-bottom pt-0 g-0"
                  >
                    <div class="col-12 col-sm-5">
                      <div
                        class="d-flex align-items-center"
                      >
                        <div
                          class="flex-shrink-0 me-3"
                        >
                          <div class="avatar">
                            <div
                              class="avatar-title rounded bg-secondary"
                            >
                              <i
                                class="mdi mdi-egg-easter font-size-20"
                              ></i>
                            </div>
                          </div>
                        </div>
                        <div
                          class="flex-grow-1 overflow-hidden"
                        >
                          <h5
                            class="font-size-15 mb-1 text-truncate"
                          >
                            김제 부화장
                          </h5>
                          <p
                            class="text-muted mb-0"
                          >
                            원활-30일령
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col col-sm-3">
                      <div
                        class="mt-3 mt-md-0 text-md-end"
                      >
                        <h5
                          class="font-size-15 mb-1 text-truncate"
                        >
                          15.2℃
                        </h5>
                        <p class="text-muted mb-0">
                          <span
                            class="badge bg-secondary"
                            ><i
                              class="mdi mdi-arrow-top-right me-1"
                            ></i>0.2℃</span
                          >
                        </p>
                      </div>
                    </div>
                    <div class="col-auto col-sm-4">
                      <div
                        class="mt-3 mt-md-0 text-end"
                      >
                        <h5
                          class="font-size-15 mb-1 text-truncate"
                        >
                          70.0％
                        </h5>
                        <p class="text-muted mb-0">
                          <span
                            class="badge bg-secondary"
                            ><i
                              class="mdi mdi-arrow-top-right me-1"
                            ></i>0％</span
                          >
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  class="row g-0"
                  style="padding-top:16px"
                >
                  <div
                    class="social-box row align-items-center border-bottom pt-0 g-0"
                  >
                    <div class="col-12 col-sm-5">
                      <div
                        class="d-flex align-items-center"
                      >
                        <div
                          class="flex-shrink-0 me-3"
                        >
                          <div class="avatar">
                            <div
                              class="avatar-title rounded bg-secondary"
                            >
                              <i
                                class="mdi mdi-egg-easter font-size-20"
                              ></i>
                            </div>
                          </div>
                        </div>
                        <div
                          class="flex-grow-1 overflow-hidden"
                        >
                          <h5
                            class="font-size-15 mb-1 text-truncate"
                          >
                            연무 부화장
                          </h5>
                          <p
                            class="text-muted mb-0"
                          >
                            원활-일령
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col col-sm-3">
                      <div
                        class="mt-3 mt-md-0 text-md-end"
                      >
                        <h5
                          class="font-size-15 mb-1 text-truncate"
                        >
                          15.2℃
                        </h5>
                        <p class="text-muted mb-0">
                          <span
                            class="badge bg-secondary"
                            ><i
                              class="mdi mdi-arrow-top-right me-1"
                            ></i>0.2℃</span
                          >
                        </p>
                      </div>
                    </div>
                    <div class="col-auto col-sm-4">
                      <div
                        class="mt-3 mt-md-0 text-end"
                      >
                        <h5
                          class="font-size-15 mb-1 text-truncate"
                        >
                          70.0％
                        </h5>
                        <p class="text-muted mb-0">
                          <span
                            class="badge bg-secondary"
                            ><i
                              class="mdi mdi-arrow-top-right me-1"
                            ></i>50％</span
                          >
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--card-body-->
            </div>
            <!--card-->
          </div>
          <!--col-xl-4-->

          <!--종계 사육현황--------------------------->
          <div class="col-xl-4">
            <div class="card">
              <div class="card-header">
                <h5>종계 사육현황</h5>
              </div>
              <!--card-header-->
              <div class="card-body">
                <div class="row g-0 border-top">
                  <div class="col-xl-4">
                    <div
                      class="border-start border-end p-3 h-100"
                    >
                      <div>
                        <p
                          class="font-size-20 mb-2"
                        >
                          전체농장
                        </p>
                        <div
                          class="badge badge-soft-primary font-size-12"
                        >
                          등록농장
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-4">
                    <div class="border-end p-3 h-100">
                      <div>
                        <h3 class="mb-0">56</h3>
                        <p
                          class="text-muted font-size-13 mb-2"
                        >
                          등록(동)
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-4">
                    <div class="border-end p-3 h-100">
                      <div>
                        <h3 class="mb-0">
                          1,000,000
                        </h3>
                        <p
                          class="text-muted font-size-13 mb-2"
                        >
                          개체수수
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row g-0 border-top">
                  <div class="col-xl-4">
                    <div
                      class="border-start border-end border-bottom p-3 h-100"
                    >
                      <div>
                        <p
                          class="font-size-20 mb-2"
                        >
                          사육농장
                        </p>
                        <div
                          class="badge bg-primary font-size-12"
                        >
                          사육중
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-4">
                    <div
                      class="border-end border-bottom p-3 h-100"
                    >
                      <div>
                        <h3 class="mb-0">45</h3>
                        <p
                          class="text-muted font-size-13 mb-2"
                        >
                          등록(동)
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-4">
                    <div
                      class="border-end border-bottom p-3 h-100"
                    >
                      <div>
                        <h3 class="mb-0">
                          800,000
                        </h3>
                        <p
                          class="text-muted font-size-13 mb-2"
                        >
                          개체수수
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <hr />

                <div class="row">
                  <div class="col-xl-3 text-center">
                    <h2
                      class="display-5 text-secondary mb-0"
                    >
                      <span style="font-weight:bold"
                        >52</span
                      >
                    </h2>
                    <p class="mb-0 text-black-60">
                      원활
                    </p>
                  </div>
                  <div class="col-xl-3 text-center">
                    <h2
                      class="display-5 text-success mb-0"
                    >
                      <span style="font-weight:bold"
                        >2</span
                      >
                    </h2>
                    <p class="mb-0 text-black-60">
                      주의
                    </p>
                  </div>
                  <div class="col-xl-3 text-center">
                    <h2
                      class="display-5 text-warning mb-0"
                    >
                      <span style="font-weight:bold"
                        >1</span
                      >
                    </h2>
                    <p class="mb-0 text-black-60">
                      경고
                    </p>
                  </div>
                  <div class="col-xl-3 text-center">
                    <h2
                      class="display-5 text-danger mb-0"
                    >
                      <span style="font-weight:bold"
                        >0</span
                      >
                    </h2>
                    <p class="mb-0 text-black-60">
                      위험
                    </p>
                  </div>
                </div>
                <!--row-->
              </div>
              <!--card-body-->
            </div>
            <!--card-->
          </div>
          <!--col-xl-4-->
        </div>
        <!--row-->
        <!---2열(end)---------------------------------------------->

        <!---1열(start)-------------------------------------------->
        <div class="row">
          <div class="col-xl-8">
            <div class="card">
              <div class="card-header">
                <div class="d-flex align-items-start">
                  <div class="flex-grow-1">
                    <h5 class="card-title">입추현황</h5>
                  </div>
                  <div class="flex-shrink-0">
                    <div class="dropdown">
                      <a
                        class="dropdown-toggle text-muted"
                        href="javascript:void(0)"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        ><span class="text-primary"
                          >호수별수수<i
                            class="mdi mdi-chevron-down ms-1"
                          ></i></span
                        ></a
                      >
                      <div
                        class="dropdown-menu dropdown-menu-end"
                      >
                        <a class="dropdown-item"
                          >호수별수수</a
                        >
                        <a class="dropdown-item"
                          >평체별수수</a
                        >
                        <a class="dropdown-item"
                          >일령별현황</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <!--d-flex-->
              </div>

              <div class="card-body">
                <div class="row align-items-center">
                  <div class="col-xl-4">
                    <div class="card bg-light mb-0">
                      <div class="card-body">
                        <div class="py-2">
                          <h5>생존수수 현황</h5>
                          <h2
                            class="mt-4 pt-1 mb-1"
                            id="todayLiveCount"
                          >
                            <span
                              id="todaySurvivesu"
                              >-</span
                            >
                          </h2>
                          <p
                            class="text-muted font-size-15 text-truncate"
                          >
                            <span
                              id="todayCalDateTime"
                              >-</span
                            >
                          </p>

                          <div
                            class="d-flex mt-4 align-items-center"
                          >
                            <div
                              id="chart0101"
                              style="width:100%;height:100px"
                              class="apexChart"
                              data-chartToolBar="false"
                              data-chartColor="Purple"
                              data-chartFontSize="12"
                            ></div>
                            <div class="ms-3">
                              <span
                                class="badge bg-danger"
                                ><i
                                  class="mdi mdi-arrow-down me-1"
                                ></i><span
                                  id="toDayRemainSuPer"
                                >
                                  - <span
                                    >%</span
                                  >
                                </span></span
                              >
                            </div>
                          </div>

                          <div class="row mt-4">
                            <div class="col">
                              <div
                                class="d-flex mt-2"
                              >
                                <i
                                  class="mdi mdi-square-rounded font-size-10 text-success mt-1"
                                ></i>
                                <div
                                  class="flex-grow-1 ms-2 ps-1"
                                >
                                  <h5
                                    class="mb-1"
                                    id="toDayExpOutSu"
                                  >
                                    <span
                                      id="todayExpOutSu"
                                      >-</span
                                    >
                                  </h5>
                                  <p
                                    class="text-muted text-truncate mb-0"
                                  >
                                    출하예정
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="col">
                              <div
                                class="d-flex mt-2"
                              >
                                <i
                                  class="mdi mdi-square-rounded font-size-10 text-primary mt-1"
                                ></i>
                                <div
                                  class="flex-grow-1 ms-2 ps-1"
                                >
                                  <h5
                                    id="todayInSu"
                                    class="mb-1"
                                  >
                                    <span
                                      id="todayInSu"
                                      >-</span
                                    >
                                  </h5>
                                  <p
                                    class="text-muted text-truncate mb-0"
                                  >
                                    오늘입추
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!--py-2-->
                      </div>
                      <!--card-body-->
                    </div>
                    <!--card bg-light mb-0-->
                  </div>
                  <!--col-xl-4-->

                  <div class="col-xl-8">
                    <div
                      id="chart0102"
                      style="width:100%;height:370px"
                      class="apexChart"
                      data-chartToolBar="false"
                      data-chartColor="Purple"
                      data-chartFontSize="12"
                    ></div>
                  </div>
                  <!--col-xl-8-->
                </div>
                <!--row align-items-center-->
              </div>
              <!--card-body-->
            </div>
            <!--card-->
          </div>
          <!--col-xl-8-->

          <div class="col-xl-4">
            <div class="card">
              <div class="card-header">
                <h5 class="card-title">개체수수</h5>
              </div>
              <div class="card-body">
                <div
                  id="chart0103"
                  style="width:95%;height:374px"
                  class="apexChart"
                  data-chartToolBar="false"
                  data-chartColor=""
                  data-chartFontSize="12"
                ></div>
              </div>
              <!--card-body-->
            </div>
            <!--card-->
          </div>
          <!--col-xl-4-->
        </div>
        <!--row-->

        <!---1열(end)---------------------------------------------->

        <!---4열(start)-------------------------------------------->

        <div class="row">
          <div class="col-xl-8">
            <div class="card">
              <div class="card-header">
                <h5>입추·출하 달력</h5>
              </div>
              <div class="card-body">
                <div style="width:100%;height:540px">
                  <div
                    style="width:100%;position:absolute;text-align:right;margin-left:-40px"
                  >
                    <div class="btn-group">
                      <a
                        href="javascript:void(0)"
                        class="calendarBtn-Prev btn btn-default btn-xs"
                        ><i
                          class="fa fa-chevron-left"
                        ></i></a
                      >
                      <a
                        href="javascript:void(0)"
                        class="calendarBtn-Next btn btn-default btn-xs"
                        ><i
                          class="fa fa-chevron-right"
                        ></i></a
                      >
                      <a
                        href="javascript:void(0)"
                        class="calendarBtn-Today btn btn-default btn-xs"
                        >오늘</a
                      >
                    </div>
                  </div>
                  <div id="calendar"></div>
                </div>
              </div>
              <!--card-body-->
            </div>
            <!--card-->
          </div>
          <!--col-xl-8-->

          <div class="col-xl-4">
            <div class="card">
              <div class="card-header">
                <h5>출하예정 농장 (30일령 이상)</h5>
                <span
                  class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  ><span id="bt0401RecNo"></span>동</span
                >
              </div>
              <!--card-header-->
              <div class="card-body">
                <div
                  class="mx-n4 px-4"
                  data-simplebar
                  style="height:540px;"
                >
                  <div class="mt-3">
                    <table
                      id="bt0401"
                      class="table table-sm table-hover table-border-strip"
                      data-toggle="table"
                      data-show-header="false"
                    >
                      <thead>
                        <tr>
                          <th
                            data-field="f1"
                            data-sortable="false"
                            data-align="center"
                            data-visible="false"
                            >아이디</th
                          >
                          <th
                            data-field="f2"
                            data-sortable="false"
                            data-align="center"
                            data-visible="false"
                            >상태</th
                          >
                          <th
                            data-field="f3"
                            data-sortable="false"
                            data-align="center"
                            data-visible="true"
                            data-width="15%"
                            >아이콘</th
                          >
                          <th
                            data-field="f4"
                            data-sortable="false"
                            data-align="left"
                            data-visible="true"
                            >내용</th
                          >
                          <th
                            data-field="f5"
                            data-sortable="false"
                            data-align="right"
                            data-visible="true"
                            >시간</th
                          >
                        </tr>
                      </thead>
                    </table>
                  </div>
                  <!--mt-3-->
                </div>
                <!--mx-n4-->
              </div>
              <!--card-body-->
            </div>
            <!--card-->
          </div>
          <!--col-xl-4-->
        </div>
        <!--row-->

        <!---4열(end)---------------------------------------------->

        <!---3열(start)-------------------------------------------->

        <div class="row">
          <div class="col-xl-3">
            <div class="card">
              <div class="card-header">
                <div
                  class="d-flex align-items-start mb-4 mb-xl-0"
                >
                  <div class="flex-grow-1">
                    <h5 class="card-title">
                      데이터수신 오류
                    </h5>
                    <span
                      class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                      ><span id="bt0301RecNo"
                      ></span>동</span
                    >
                  </div>
                  <!--flex-grow-1-->
                  <div class="flex-shrink-0">
                    <div class="dropdown">
                      <a
                        class="dropdown-toggle text-reset"
                        href="javascript:void(0)"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <span class="text-muted"
                          >수신실패<i
                            class="mdi mdi-chevron-down ms-1"
                          ></i></span
                        >
                      </a>
                      <div
                        class="dropdown-menu dropdown-menu-end"
                      >
                        <a class="dropdown-item"
                          >수신정상</a
                        >
                        <a class="dropdown-item"
                          >수신실패</a
                        >
                      </div>
                    </div>
                  </div>
                  <!--flex-shrink-0-->
                </div>
                <!--d-flex-->
              </div>
              <!--card-header-->
              <div class="card-body">
                <div style="width:340px;height:220px">
                  <div
                    id="chart0301"
                    class="apexChart"
                    data-chartToolBar="false"
                    data-chartColor="Purple"
                    data-chartFontSize="12"
                  ></div>
                </div>
                <hr />
                <div
                  class="mx-n4 px-4"
                  data-simplebar
                  style="height:340px;"
                >
                  <div class="mt-3">
                    <table
                      id="bt0301"
                      class="table table-sm table-hover table-border-strip"
                      data-toggle="table"
                      data-show-header="false"
                    >
                      <thead>
                        <tr>
                          <th
                            data-field="f1"
                            data-sortable="false"
                            data-align="center"
                            data-visible="false"
                            >아이디</th
                          >
                          <th
                            data-field="f2"
                            data-sortable="false"
                            data-align="center"
                            data-visible="false"
                            >상태</th
                          >
                          <th
                            data-field="f3"
                            data-sortable="false"
                            data-align="center"
                            data-visible="true"
                            data-width="15%"
                            >아이콘</th
                          >
                          <th
                            data-field="f4"
                            data-sortable="false"
                            data-align="left"
                            data-visible="true"
                            >내용</th
                          >
                          <th
                            data-field="f5"
                            data-sortable="false"
                            data-align="right"
                            data-visible="true"
                            >범위</th
                          >
                        </tr>
                      </thead>
                    </table>
                  </div>
                  <!--mt-3-->
                </div>
                <!--mx-n4-->
              </div>
              <!--card-body-->
            </div>
            <!--card-->
          </div>
          <!--col-xl-3-->

          <div class="col-xl-3">
            <div class="card">
              <div class="card-header">
                <div
                  class="d-flex align-items-start mb-4 mb-xl-0"
                >
                  <div class="flex-grow-1">
                    <h5 class="card-title">
                      평체산출 오류
                    </h5>
                    <span
                      class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                      ><span id="bt0302RecNo"
                      ></span>동</span
                    >
                  </div>
                  <!--flex-grow-1-->
                  <div class="flex-shrink-0">
                    <div class="dropdown">
                      <a
                        class="dropdown-toggle text-reset"
                        href="javascript:void(0)"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <span class="text-muted"
                          >산출실패<i
                            class="mdi mdi-chevron-down ms-1"
                          ></i></span
                        >
                      </a>
                      <div
                        class="dropdown-menu dropdown-menu-end"
                      >
                        <a class="dropdown-item"
                          >산출정상</a
                        >
                        <a class="dropdown-item"
                          >산출실패</a
                        >
                      </div>
                    </div>
                  </div>
                  <!--flex-shrink-0-->
                </div>
                <!--d-flex-->
              </div>
              <!--card-header-->
              <div class="card-body">
                <div style="width:340px;height:220px">
                  <div
                    id="chart0302"
                    class="apexChart"
                    data-chartToolBar="false"
                    data-chartColor=""
                    data-chartFontSize="12"
                  ></div>
                </div>
                <hr />
                <div
                  class="mx-n4 px-4"
                  data-simplebar
                  style="height:340px;"
                >
                  <div class="mt-3">
                    <table
                      id="bt0302"
                      class="table table-sm table-hover table-border-strip"
                      data-toggle="table"
                      data-show-header="false"
                    >
                      <thead>
                        <tr>
                          <th
                            data-field="f1"
                            data-sortable="false"
                            data-align="center"
                            data-visible="false"
                            >아이디</th
                          >
                          <th
                            data-field="f2"
                            data-sortable="false"
                            data-align="center"
                            data-visible="false"
                            >상태</th
                          >
                          <th
                            data-field="f3"
                            data-sortable="false"
                            data-align="center"
                            data-visible="true"
                            data-width="15%"
                            >아이콘</th
                          >
                          <th
                            data-field="f4"
                            data-sortable="false"
                            data-align="left"
                            data-visible="true"
                            >내용</th
                          >
                          <th
                            data-field="f5"
                            data-sortable="false"
                            data-align="right"
                            data-visible="true"
                            >범위</th
                          >
                        </tr>
                      </thead>
                    </table>
                  </div>
                  <!--mt-3-->
                </div>
                <!--mx-n4-->
              </div>
              <!--card-body-->
            </div>
            <!--card-->
          </div>
          <!--col-xl-3-->

          <div class="col-xl-3">
            <div class="card">
              <div class="card-header">
                <div
                  class="d-flex align-items-start mb-4 mb-xl-0"
                >
                  <div class="flex-grow-1">
                    <h5 class="card-title">PLC-알람</h5>
                    <span
                      class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                      ><span id="bt0303RecNo"
                      ></span>동</span
                    >
                  </div>
                  <!--flex-grow-1-->
                  <div class="flex-shrink-0">
                    <div class="dropdown">
                      <a
                        class="dropdown-toggle text-reset"
                        href="javascript:void(0)"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <span class="text-muted"
                          >PLC알람<i
                            class="mdi mdi-chevron-down ms-1"
                          ></i></span
                        >
                      </a>
                      <div
                        class="dropdown-menu dropdown-menu-end"
                      >
                        <a class="dropdown-item"
                          >PLC정상</a
                        >
                        <a class="dropdown-item"
                          >PLC알람</a
                        >
                      </div>
                    </div>
                  </div>
                  <!--flex-shrink-0-->
                </div>
                <!--d-flex-->
              </div>
              <!--card-header-->
              <div class="card-body">
                <div style="width:340px;height:220px">
                  <div
                    id="chart0303"
                    class="apexChart"
                    data-chartToolBar="false"
                    data-chartColor="Purple"
                    data-chartFontSize="12"
                  ></div>
                </div>
                <hr />
                <div
                  class="mx-n4 px-4"
                  data-simplebar
                  style="height:340px;"
                >
                  <div class="mt-3">
                    <table
                      id="bt0303"
                      class="table table-sm table-hover table-border-strip"
                      data-toggle="table"
                      data-show-header="false"
                    >
                      <thead>
                        <tr>
                          <th
                            data-field="f1"
                            data-sortable="false"
                            data-align="center"
                            data-visible="false"
                            >아이디</th
                          >
                          <th
                            data-field="f2"
                            data-sortable="false"
                            data-align="center"
                            data-visible="false"
                            >상태</th
                          >
                          <th
                            data-field="f3"
                            data-sortable="false"
                            data-align="center"
                            data-visible="true"
                            data-width="15%"
                            >아이콘</th
                          >
                          <th
                            data-field="f4"
                            data-sortable="false"
                            data-align="left"
                            data-visible="true"
                            >내용</th
                          >
                          <th
                            data-field="f5"
                            data-sortable="false"
                            data-align="right"
                            data-visible="true"
                            >범위</th
                          >
                        </tr>
                      </thead>
                    </table>
                  </div>
                  <!--mt-3-->
                </div>
                <!--mx-n4-->
              </div>
              <!--card-body-->
            </div>
            <!--card-->
          </div>
          <!--col-xl-3-->

          <div class="col-xl-3">
            <div class="card">
              <div class="card-header">
                <div
                  class="d-flex align-items-start mb-4 mb-xl-0"
                >
                  <div class="flex-grow-1">
                    <h5 class="card-title">
                      폐사관리 미흡
                    </h5>
                    <span
                      class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                      ><span id="bt0304RecNo"
                      ></span>동</span
                    >
                  </div>
                  <!--flex-grow-1-->
                  <div class="flex-shrink-0">
                    <div class="dropdown">
                      <a
                        class="dropdown-toggle text-reset"
                        href="javascript:void(0)"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <span class="text-muted"
                          >관리미흡<i
                            class="mdi mdi-chevron-down ms-1"
                          ></i></span
                        >
                      </a>
                      <div
                        class="dropdown-menu dropdown-menu-end"
                      >
                        <a class="dropdown-item"
                          >관리정상</a
                        >
                        <a class="dropdown-item"
                          >관리미흡</a
                        >
                      </div>
                    </div>
                  </div>
                  <!--flex-shrink-0-->
                </div>
                <!--d-flex-->
              </div>
              <!--card-header-->
              <div class="card-body">
                <div style="width:320px;height:220px">
                  <div
                    id="chart0304"
                    class="apexChart"
                    data-chartToolBar="false"
                    data-chartColor=""
                    data-chartFontSize="12"
                  ></div>
                </div>
                <hr />
                <div
                  class="mx-n4 px-4"
                  data-simplebar
                  style="height:340px;"
                >
                  <div class="mt-3">
                    <table
                      id="bt0304"
                      class="table table-sm table-hover table-border-strip"
                      data-toggle="table"
                      data-show-header="false"
                      data-sort-name="f3"
                      data-sort-order="desc"
                    >
                      <thead>
                        <tr>
                          <th
                            data-field="f1"
                            data-sortable="false"
                            data-align="center"
                            data-visible="false"
                            >아이디</th
                          >
                          <th
                            data-field="f2"
                            data-sortable="false"
                            data-align="center"
                            data-visible="false"
                            >상태</th
                          >
                          <th
                            data-field="f3"
                            data-sortable="false"
                            data-align="center"
                            data-visible="true"
                            data-width="15%"
                            >아이콘</th
                          >
                          <th
                            data-field="f4"
                            data-sortable="false"
                            data-align="left"
                            data-visible="true"
                            >내용</th
                          >
                          <th
                            data-field="f5"
                            data-sortable="false"
                            data-align="right"
                            data-visible="true"
                            >범위</th
                          >
                        </tr>
                      </thead>
                    </table>
                  </div>
                  <!--mt-3-->
                </div>
                <!--mx-n4-->
              </div>
              <!--card-body-->
            </div>
            <!--card-->
          </div>
          <!--col-xl-3-->
        </div>
        <!--row-->

        <!---3열(end)---------------------------------------------->

        <!---5열(start)-------------------------------------------->

        <div class="row">
          <div class="col-xl-12">
            <div class="card">
              <div class="card-header">
                <div
                  class="d-flex align-items-start mb-4 mb-xl-0"
                >
                  <div class="flex-grow-1">
                    <h5>입추농장 목록</h5>
                    <span
                      class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                      ><span id="bt0501RecNo"
                      ></span>동</span
                    >
                  </div>
                  <!--flex-grow-1-->
                  <div class="flex-shrink-0">
                    <div class="dropdown">
                      <a
                        class="dropdown-toggle text-reset"
                        href="javascript:void(0)"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <span class="text-muted"
                          >전체일령<i
                            class="mdi mdi-chevron-down ms-1"
                          ></i></span
                        >
                      </a>
                      <div
                        class="dropdown-menu dropdown-menu-end"
                      >
                        <a class="dropdown-item"
                          >전체일령</a
                        >
                        <a class="dropdown-item"
                          >10일령</a
                        >
                        <a class="dropdown-item"
                          >20일령</a
                        >
                        <a class="dropdown-item"
                          >30일령</a
                        >
                        <a class="dropdown-item"
                          >30이상</a
                        >
                      </div>
                    </div>
                  </div>
                  <!--flex-shrink-0-->
                </div>
                <!--d-flex-->
              </div>
              <!--card-header-->
              <div class="card-body">
                <table
                  id="bt0501"
                  class="table table-hover table-striped"
                  data-toggle="table"
                  data-search="true"
                  style="overflow:hidden"
                >
                  <thead>
                    <tr>
                      <th
                        data-field="f1"
                        data-sortable="true"
                        data-align="center"
                        data-visible="false"
                        >농장ID</th
                      >
                      <th
                        data-field="f2"
                        data-sortable="true"
                        data-align="left"
                        data-visible="true"
                        >농장명</th
                      >
                      <th
                        data-field="f3"
                        data-sortable="true"
                        data-align="center"
                        data-visible="true">일령</th
                      >
                      <th
                        data-field="f4"
                        data-sortable="true"
                        data-align="center"
                        data-visible="true"
                        >입추일자</th
                      >

                      <th
                        data-field="f5"
                        data-sortable="true"
                        data-align="right"
                        data-visible="true"
                        >사료평체(g)</th
                      >

                      <th
                        data-field="f6"
                        data-sortable="true"
                        data-align="center"
                        data-visible="true"
                        >온도알람</th
                      >

                      <th
                        data-field="f7"
                        data-sortable="true"
                        data-align="right"
                        data-visible="true"
                        >예측평체(g)</th
                      >
                      <th
                        data-field="f8"
                        data-sortable="true"
                        data-align="right"
                        data-visible="true">FCR</th
                      >
                      <th
                        data-field="f9"
                        data-sortable="true"
                        data-align="right"
                        data-visible="true"
                        >PN지수</th
                      >

                      <th
                        data-field="f10"
                        data-sortable="false"
                        data-align="right"
                        data-visible="true"
                        >변이계수</th
                      >
                      <th
                        data-field="f11"
                        data-sortable="false"
                        data-align="right"
                        data-visible="true"
                        >표준편차(g)</th
                      >
                      <th
                        data-field="f12"
                        data-sortable="false"
                        data-align="right"
                        data-visible="true"
                        >+1일(g)</th
                      >
                      <th
                        data-field="f13"
                        data-sortable="false"
                        data-align="right"
                        data-visible="true"
                        >+2일(g)</th
                      >
                      <th
                        data-field="f14"
                        data-sortable="false"
                        data-align="right"
                        data-visible="true"
                        >+3일(g)</th
                      >
                      <th
                        data-field="f15"
                        data-sortable="false"
                        data-align="center"
                        data-visible="true"
                        data-width="100"
                        >사료잔량(Kg)</th
                      >
                    </tr>
                  </thead>
                </table>
              </div>
              <!--card-body-->
            </div>
            <!--card-->
          </div>
          <!--col-xl-12-->
        </div>
        <!--row-->

        <!---5열(end)---------------------------------------------->
      </div>
      <!-- container-fluid -->
    </div>
    <!-- End Page-content -->

    <footer class="footer">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6">KOKOFARM</div>
          <div class="col-sm-6">
            <div class="text-sm-end d-none d-sm-block">
              Copyright &copy; 2023 EMOTION Co., Ltd. All
              rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
  <!-- end main content-->
</div>
<!-- END layout-wrapper -->


