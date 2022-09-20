declare namespace API {
  type LoginModel = {
    /** 工程ID或工程名称（如果为空，系统自动选择） */
    Project?: string;
    /** 登录ID */
    LoginID: string;
    /** 密码 */
    Password: string;
  };

  type LoginUser = {
    /** 回话ID */
    SessionID?: string;
    /** 工程ID */
    ProjectID?: string;
    /** 用户ID */
    UserID?: string;
    /** 登录ID */
    LoginID?: string;
    /** 用户名 */
    UserName?: string;
  };

  type LoginUserAPIResult = {
    /** 操作所否成功 */
    IsOk?: boolean;
    /** 错误代码 */
    ErrorID?: string;
    /** 错误信息 */
    ErrorMsg?: string;
    Response?: LoginUser;
  };

  type TokenResult = {
    /** Token */
    Token?: string;
    /** 过期时间 */
    ExpiresIn?: string;
    /** Token类型 */
    TokenType?: string;
  };

  type TokenResultAPIResult = {
    /** 操作所否成功 */
    IsOk?: boolean;
    /** 错误代码 */
    ErrorID?: string;
    /** 错误信息 */
    ErrorMsg?: string;
    Response?: TokenResult;
  };

}
