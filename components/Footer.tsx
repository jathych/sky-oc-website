export default function Footer() {
  return (
    <footer className="bg-gradient-dark text-dark-text mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">关于</h3>
            <p className="text-sm text-dark-text/80">
              这是一个基于光遇世界观的原创角色展示网站，讲述光之子与暗之子对立世界中的冒险故事。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/characters" className="text-dark-text/80 hover:text-light-primary transition-colors">
                  角色介绍
                </a>
              </li>
              <li>
                <a href="/scenes" className="text-dark-text/80 hover:text-light-primary transition-colors">
                  小剧场
                </a>
              </li>
              <li>
                <a href="/novel" className="text-dark-text/80 hover:text-light-primary transition-colors">
                  正剧连载
                </a>
              </li>
              <li>
                <a href="/artworks" className="text-dark-text/80 hover:text-light-primary transition-colors">
                  画廊
                </a>
              </li>
              <li>
                <a href="/admin/login" className="text-dark-text/80 hover:text-light-primary transition-colors">
                  管理后台
                </a>
              </li>
              <li>
                <a href="/admin/theme" className="text-dark-text/80 hover:text-light-primary transition-colors">
                  主题管理
                </a>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">世界观</h3>
            <p className="text-sm text-dark-text/80">
              光之子与暗之子，两个国度因资源竞争而产生冲突。在这个充满冒险与选择的世界中，每个角色都在寻找属于自己的道路。
            </p>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4">关注我</h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.xiaohongshu.com/user/profile/YOUR_ID"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark-text/80 hover:text-light-primary transition-colors"
                  aria-label="小红书"
                  title="小红书"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10" opacity="0.2"/>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-dark-text/20 text-center text-sm text-dark-text/60">
          <p>&copy; {new Date().getFullYear()} 光遇世界 OC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
