using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Tools.ExtensionMethods
{
    /// <summary>
    /// Adding new methods to string
    /// </summary>
    public static class StringExtensionMethod
    {
        #region Public methods
        /// <summary>
        /// Adding specific code to right align a string content.
        /// Uses it for BB content of RichTextLabel
        /// </summary>
        /// <returns></returns>
        public static string AlignRightToBBContent(this string content)
        {
            return string.Format("[right]{0}[/right]", content);
        }
        #endregion
    }
}
